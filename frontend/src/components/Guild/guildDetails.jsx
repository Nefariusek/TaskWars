import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Form, Grid, Header, Icon, Image, Input, Item, Label, Radio, Segment } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import TopPortal from '../Utils/TopPortal';
import FightPattern from './FightPattern';

class GuildJoin extends React.Component {
  constructor(props) {
    super(props);
    this.portalRefAdd = React.createRef();
    this.portalRefDelete = React.createRef();

    this.state = {
      guild_id: '',
      name: '',
      leader: '',
      leaderId: '',
      flag: '',
      leaderName: '',
      current_fight: {},
      guildDesc: '',
      guildType: '',
      isLeader: false,
      membersId: [],
      membersName: [],
      charId: 'All',
      charName: [],
      Tags: '',
      results: [],
      charResult: [],
      open: false,
      userExist: true,
      type: 'Email',
      color: 'brown',
    };
  }

  static contextType = Store;

  getGuild = async () => {
    await axios({
      url: `api/guilds/${this.state.guild_id}`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      response => {
        this.setState({ name: response.data.name, leader: response.data.leader, flag: response.data.flag });
      },
      error => {
        console.log(error);
      },
    );
  };

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    this.checkLeadership(body.character_id);
    this.setState({ leaderId: body._id });
    this.getData(this.state.guild_id);
  };

  getData = async id => {
    this.setState({ charName: [], membersName: [] });
    let response = await fetch(`/api/guilds/${id}`, setHeaders());
    let body = await response.json();
    this.setState({
      current_fight: body.current_fight,
      flag: body.flag,
      guildDesc: body.description,
      guildType: body.type,
      membersId: body.members,
    });

    for (let i = 0; i < this.state.membersId.length; i++) {
      const res = await fetch(`/api/users/character/${this.state.membersId[i]}`, setHeaders()).then(response =>
        response.json(),
      );
      const charRes = await fetch(`/api/characters/${this.state.membersId[i]}`, setHeaders()).then(response =>
        response.json(),
      );

      this.setState({
        membersName: [...this.state.membersName, res],
        charName: [...this.state.charName, charRes],
      });
    }

    const res = await fetch(`/api/characters/${this.state.leader}`, setHeaders()).then(response => response.json());
    this.setState({
      leaderName: res,
    });
  };

  findMember = async () => {
    if (this.state.type === 'Email') {
      this.setState({ results: [], charResult: [] });
      const resChar = await fetch(`/api/characters/search/${this.state.charId}&`, setHeaders()).then(response =>
        response.json(),
      );
      this.setState({ charResult: resChar });

      const res = await fetch(`/api/users/search/${this.state.charId}&${this.state.tags}`, setHeaders()).then(
        response => response.json(),
      );

      res.forEach((elem, index) => {
        this.state.charResult.forEach((el, ind) => {
          if (elem.character_id === el._id && el.name)
            this.setState({
              results: [...this.state.results, elem],
            });
        });
      });
    } else {

      this.setState({ results: [], charResult: [] });
      const resChar = await fetch(`/api/characters/search/${this.state.charId}&${this.state.tags}`, setHeaders()).then(
        response => response.json(),
      );
      this.setState({ charResult: resChar });

      const res = await fetch(`/api/users/search/${this.state.charId}&`, setHeaders()).then(response =>
        response.json(),
      );

      res.forEach((elem, index) => {
        this.state.charResult.forEach((el, ind) => {
          if (elem.character_id === el._id && el.name)
            this.setState({
              results: [...this.state.results, elem],
            });
        });
      });
    }
  };

  addMember = async id => {
    const memberToInsert = {
      name: `${this.state.name}`,
      members: [`${id.character_id}`],
    };
    const res = await axios.put(`/api/guilds/${this.state.guild_id}/members`, memberToInsert);
    if (res.status === 200)
      this.portalRefAdd.current.handleOpen();
    this.fetchUser();
    this.findMember();
    await new Promise(res => setTimeout(res, 3500));
    this.setState({ open: false });
  };

  deleteMember = async id => {
    const res = await axios.delete(`/api/guilds/${this.state.guild_id}/${id._id}`);
    if (res.status === 200)
      this.portalRefDelete.current.handleOpen();
    this.fetchUser();
    this.findMember();
    await new Promise(res => setTimeout(res, 3500));
    this.setState({ open: false });
  };

  checkLeadership = async character_id => {
    if (character_id === this.state.leader) {
      this.setState({ isLeader: true });
      this.context.changeStore('isLeader', true);
    } else {
      this.setState({ isLeader: false });
      this.context.changeStore('isLeader', false);
    }
  };

  checkUser = id => {
    let check = false;
    check = this.state.membersName.find(elem => {
      return elem._id === id;
    });
    if (id === this.state.leaderId || check) {
      return false;
    } else {
      return true;
    }
  };

  checkCharacterName = id => {
    let nameChar = '';
    nameChar = this.state.charResult.filter(elem => {
      return id.character_id === elem._id;
    });
    if (nameChar[0]) return nameChar[0].name;
  };

  getCharacterAvatar = id => {
    let nameChar = '';
    nameChar = this.state.charResult.filter(elem => {
      return id.character_id === elem._id;
    });
    if (nameChar[0]) return nameChar[0].avatar;
  };

  componentDidMount = async () => {
    await this.setState({ guild_id: this.context.guild_id });
    await this.getGuild();
    await this.fetchUser();
  };

  onSearchButtonClick = event => {
    this.findMember();
  };

  ButtonClick = async id => {
    await this.addMember(id);
  };

  ButtonClickDelate = async id => {
    await this.deleteMember(id);
  };

  onSearchChange = event => {
    const str = event.target.value.toLowerCase();
    this.setState({ tags: str.split(' ').join('_') });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  colorChange = (e, { value }) => this.setState({ color: value });

  render() {
    return (
      <Container>
        <Segment inverted>
          <Item>
            <Image size="tiny" src={this.state.flag} style={{ display: 'inline-block' }}></Image>
            <Item.Header style={{ display: 'inline-block' }} as={'h1'}>
              {this.state.name}{' '}
            </Item.Header>
            <Item.Header as={'h3'}>Guild details</Item.Header>
            <Item.Header style={{ marginBottom: '10px' }}>Guild leader: {' '}
              <Label as='a' color='black' image>
                <img src={this.state.leaderName.avatar} alt={"Leader Avatar"} />
                {this.state.leaderName.name}
              </Label>
            </Item.Header>
            <Item.Header style={{ marginBottom: '10px' }}>Type: {this.state.guildType}</Item.Header>
            <Item.Header style={{ marginBottom: '10px' }}>Description: {this.state.guildDesc}</Item.Header>
          </Item>
        </Segment>

        {this.state.isLeader === true ? (
          <div>
            {this.state.current_fight != null ? (
              <Segment inverted>
                <Item.Header as={'h3'}>We are fighting against:</Item.Header>
                <FightPattern creature={this.state.current_fight} />
              </Segment>
            ) : (
                <Segment inverted size="big">
                  <Grid padded>
                    <Header inverted> Choose creature and fight!</Header>
                    <Button color="brown" floated="right" as={NavLink} to="/creatures">
                      Fight!
                  </Button>
                  </Grid>
                </Segment>
              )}
            <Segment inverted>
              <Item>
                <Header inverted as={'h3'}>
                  {' '}
                  List of members :
                </Header>
                {this.state.charName.map(x => (
                  <Item key={x._id}>
                    <Item.Content>
                      <Grid padded>
                        {(this.state.leader === x._id) ? (
                          <Button
                            inverted
                            compact
                            color={this.state.color}
                            size="mini"
                          >
                            <Button.Content visible>
                              <Icon name="user" />
                            </Button.Content>
                          </Button>
                        ) : (
                            <Button
                              inverted
                              animated
                              compact
                              color={this.state.color}
                              size="mini"
                              onClick={async () => {
                                await this.ButtonClickDelate(x);
                              }}
                            >
                              <Button.Content visible>
                                <Icon name="user" />
                              </Button.Content>
                              <Button.Content hidden>
                                <Icon name="trash alternate outline" />
                              </Button.Content>
                            </Button>
                          )}
                        <Label as='a' image color='black'>
                          <img src={x.avatar} alt={"Avatar"} />
                          {x.name}
                        </Label>
                      </Grid>
                    </Item.Content>
                  </Item>
                ))}
                <Header inverted as={'h3'}>
                  Find new players
                </Header>
                <Form inverted>
                  <Form.Group inline>
                    <label>Search by : </label>
                    <Form.Field
                      control={Radio}
                      label="Email"
                      value="Email"
                      name="type"
                      checked={this.state.type === 'Email'}
                      onChange={this.handleChange}
                    />
                    <Form.Field
                      control={Radio}
                      label="Character"
                      value="Character"
                      name="type"
                      checked={this.state.type === 'Character'}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form>
                <Grid padded>
                  <Input placeholder="Email..." onChange={this.onSearchChange} />
                  <Button animated collor="grey" onClick={this.onSearchButtonClick}>
                    <Button.Content visible>Search</Button.Content>
                    <Button.Content hidden>
                      <Icon name="search" />
                    </Button.Content>
                  </Button>

                  <Container>
                    {this.state.results.map(x => (
                      <Item key={x._id}>
                        <Item.Content>
                          <Grid padded>
                            {this.checkUser(x._id) ? (
                              <Button
                                inverted
                                animated
                                compact
                                size="mini"
                                color="green"
                                onClick={async () => {
                                  await this.ButtonClick(x);
                                }}>
                                <Button.Content visible>
                                  <Icon name="user" />
                                </Button.Content>
                                <Button.Content hidden>
                                  <Icon name="plus" />
                                </Button.Content>
                              </Button>
                            ) : (
                                <Button compact size="mini" color="black">
                                  <Icon name="minus" />
                                </Button>
                              )}
                            <Label as='a' image color='black'>
                              <img src={this.getCharacterAvatar(x)} alt={"Avatar"} />
                              {this.checkCharacterName(x)}{' '}
                              <Label.Detail>{x.name} | {x.email}</Label.Detail>
                            </Label>
                          </Grid>
                        </Item.Content>
                      </Item>
                    ))}
                  </Container>
                </Grid>
              </Item>
            </Segment>
          </div>
        ) : (
            <div>
              {this.state.current_fight != null ? (
                <Segment inverted>
                  <Item.Header as={'h3'}>We are fighting against:</Item.Header>
                  <FightPattern creature={this.state.current_fight} />
                </Segment>
              ) : (
                  <Segment inverted>Your guild is taking a break.</Segment>
                )}
              <Segment inverted>
                <Item>
                  <Header inverted as={'h3'}>
                    {' '}
                    List of members :
                </Header>
                  {this.state.charName.map(x => (
                    <Item key={x._id}>
                      <Item.Content>
                        <Label as='a' image color='black'>
                          <img src={x.avatar} alt={"Avatar"} />
                          {x.name}
                        </Label>
                      </Item.Content>
                    </Item>
                  ))}
                </Item>
              </Segment>
            </div>
          )}
        <TopPortal ref={this.portalRefAdd} header={'Success!'} description={`Adding a player to the guild`} />
        <TopPortal ref={this.portalRefDelete} header={''} description={`Delete a player from the guild`} />
      </Container>
    );
  }
}

export default GuildJoin;
