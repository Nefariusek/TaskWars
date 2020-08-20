import React from 'react';
import { AccountButton, Avatar, Details, ExperienceBar, Guilds, HealthBar, Statistics } from '../../components/Profile';
import setHeaders from '../../utils/setHeaders';

class Profile extends React.Component {

  state = {
    id: '',
    char_id: '',
    email: '',
    userName: '',
    name: "",
    level: 0,
    guilds: [],
    health: 50,
    maxHealth: 100,
    expRequired: 200,
    exp: 50,
    class: "",
    avatar: "",
    physical: 0,
    magical: 0,
    guildsNames: [],
  }

  componentDidMount() {
    this.fetchUser()
      .then((x) => {
        this.render();
      })
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    return await this.fetchCharacter(body);
  };

  fetchCharacter = async (user) => {
    const response = await fetch(`/api/characters/${user.character_id}`, setHeaders());
    const body = await response.json();;
    const names = await this.fetchGuilds(body.guilds);
    this.setState({
      id: user._id,
      char_id: user.character_id,
      email: user.email,
      userName: user.name,
      name: body.name,
      level: body.level,
      guilds: body.guilds,
      health: body.health,
      maxHealth: body.maxHealth,
      expRequired: body.expRequired,
      exp: body.exp_points,
      class: body.charClass,
      avatar: body.avatar,
      physical: body.physical_power,
      magical: body.magical_power,
      guildsNames: [...names[0]]
    })
  }

  fetchGuilds = async (idList) => {
    const names = [];
    const requests = idList.map(async (id) => {
      const response = await fetch(`/api/guilds/${id}`, setHeaders());
      const body = await response.json();
      return body.name;
    })

    return await Promise.all(requests)
      .then((name) => {
        names.push(name)
      })
      .then(() => {
        return names;
      })
  }

  render() {
    console.log(this.state.avatar)
    return (
      <div className="profileViewDiv">
        <div className="profileCharacterDetails">
          <h1>Character Details</h1>
          <Avatar avatar={this.state.avatar} id={this.state.char_id} />
          <Details name={this.state.name} level={this.state.level} />
          <div className="progress">
            <HealthBar health={this.state.health} maxHealth={this.state.maxHealth} />
            <ExperienceBar exp={this.state.exp} expRequired={this.state.expRequired} />
          </div>
        </div>
        <div className="profileViewGroup">
          <AccountButton id={this.state.id} email={this.state.email} userName={this.state.userName} />
          <div className="profileCharacterGuilds">
            <Guilds guilds={this.state.guildsNames} />
          </div>
          <div className="profileCharacterStatistics">
            <Statistics class={this.state.class} physical={this.state.physical} magical={this.state.magical} />
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
