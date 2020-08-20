import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Header, Icon, Image, Item, Label, Popup, Segment } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import TopPortal from '../Utils/TopPortal';

const axios = require('axios');

class GuildPattern extends React.Component {
  constructor(props) {
    super(props);

    this.portalRef = React.createRef();
    this.portalRef2 = React.createRef();
    this.portalRef3 = React.createRef();
    this.state = { open: false, guildChosen: false }
  }

  handleButtonAddClick = async (e, { name }) => {
    this.setState({ open: true });
    const user = await fetch('/api/users/me', setHeaders())
      .then(response => response.json());
    const character = await fetch(`/api/characters/${user.character_id}`)
      .then(response => response.json());

    const memberToInsert = {
      "name": `${this.props.guild.name}`,
      "members": [`${character._id}`],
    };

    if (this.props.guild.leader === character._id) {
      this.portalRef2.current.handleOpen();
      return
    }

    if (this.props.guild.members.includes(character._id)) {
      this.portalRef3.current.handleOpen();
      return
    }

    const res = await axios.put(`/api/guilds/${this.props.guild._id}/members`, memberToInsert);

    if (res.status === 200)
      this.state.guildChosen = true;
    this.portalRef.current.handleOpen();
    await new Promise(res => setTimeout(res, 3500));
    this.setState({ open: false });
  }

  checkLeader = () => {
    if (this.props.userId === this.props.guild.leader)
      return false;
    return true;
  }

  checkMember = () => {
    let check = true;
    this.props.guild.members.forEach(elem => {
      if (elem === this.props.userId) {
        check = false;
      }
    })
    return check;
  }

  render() {
    if (this.state.guildChosen) return <Redirect to="/guildJoin" />;
    return (
      <Container>
        <Segment textAlign='left' inverted>
          <Item>
            <Image size='mini' src={this.props.guild.flag} style={{ display: 'inline-block' }}></Image>
            <Item.Header style={{ color: 'white', display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }} as={'h1'}>
              {this.props.guild.name}
            </Item.Header>
            <Popup content='Type' trigger={
              <Label color='orange'>
                {this.props.guild.type}
              </Label>
            } />

            <Item.Description>
              <Segment.Group>
                <Segment
                  inverted
                  textAlign='center'
                  color='brown'
                  style={{ padding: '2px 0px 0px 6px' }}>
                  <Header as='h5'>
                    Description
                        </Header>
                </Segment>
                <Segment>
                  {this.props.guild.description}<br />
                </Segment>
              </Segment.Group>
            </Item.Description>

            <Item.Extra>
              {(this.checkMember() && this.checkLeader()) ?
                <Button
                  fluid
                  icon
                  color='brown'
                  labelPosition='right'
                  onClick={this.handleButtonAddClick}
                  disabled={this.state.open}>
                  <Icon name='plus' />
                  Join to Guild
                </Button>
                : null}
            </Item.Extra>
          </Item>
        </Segment>

        <TopPortal
          ref={this.portalRef}
          header={'Success!'}
          description={`You join to guild ${this.props.guild.name}`}
        />
        <TopPortal
          ref={this.portalRef2}
          header={`You are a leader of guild ${this.props.guild.name}!`}
        />
        <TopPortal
          ref={this.portalRef3}
          header={`You are a member of guild ${this.props.guild.name}!`}
        />
      </Container>
    );
  }
}

export default GuildPattern;