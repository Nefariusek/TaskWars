import axios from 'axios';
import React from 'react';
import { Button, Form, Grid, Header, Radio, Segment, TextArea } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import ErrorMessage from '../ErrorMessage';
import Flag from './guildFlag';

class GuildCreate extends React.Component {
  constructor(props) {
    super(props);

    this.avatarHoverRef = React.createRef();
    this.state = {
      name: '',
      nameTaken: false,
      leader: null,
      description: ' ',
      type: '',
      flag: 'https://findicons.com/files/icons/2799/flat_icons/128/shield.png',
    }
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    this.setState(
      {
        leader: body.character_id
      }
    )
  }

  postGuild = async () => {
    console.log(this.state.flag)
    try {
      const res = await axios({
        url: 'api/guilds',
        method: 'post',
        data: {
          name: this.state.name,
          leader: this.state.leader,
          type: this.state.type,
          description: this.state.description,
          flag: this.state.flag,
          members: [this.state.leader],
        },
        headers: setHeaders(),
      });

      if (res.status === 200) {
        console.log(res)
        document.location.href = "/guild";
      } else {
        this.setState({ invalidData: true });
      }
    }
    catch (error) {
      console.error('Error Guild Creation:', error);
      this.setState({ invalidData: true });
    }
  };

  checkName = async () => {
    await axios({
      url: 'api/guilds',
      method: 'get',
      headers: setHeaders(),
    }).then((response) => {
      response.data.forEach((data) => {
        if (data.name === this.state.name) {
          this.setState({ nameTaken: true })
        }
      })
    }, (error) => {
      console.log(error);
    });
  };

  onButtonSubmit = async e => {
    e.preventDefault();
    this.fetchUser();
    this.setState({ nameTaken: false })
    await this.checkName();
    if (this.state.nameTaken === false) {
      this.postGuild();
    }
  };

  nameValidate = (e) => {
    if (this.state.name.length < 5 && this.state.invalidData) {
      return <ErrorMessage message='Name must be longer than five characters!' />
    } else if (this.state.nameTaken === true) {
      return <ErrorMessage message='A guild with this name already exists!' />
    }
    else { return null }
  };

  descriptionValidate = (e) => {
    if (this.state.description === '' && this.state.invalidData) {
      return { content: <ErrorMessage message='Description shoud have between 5 and 50 characters' /> }
    }
    else { return null }

  };

  typeValidate = (e) => {
    if (this.state.type === '' && this.state.invalidData) {
      return <ErrorMessage message='Choose type' />
    }
    else { return null }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleClose = (img) => {
    this.setState({ flag: img });
  }

  render() {
    const { type } = this.state
    return (
      <Segment textAlign='left' inverted>
        <Form error inverted onSubmit={this.onButtonSubmit}>
          <Header inverted>Create a guild!</Header>
          <Form.Input
            error={this.nameValidate()}
            label="Your guild's name"
            placeholder='Name'
            name='name'
            type='name'
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Form.Field
            error={this.descriptionValidate()}
            control={TextArea}
            label='Description'
            placeholder='Write description of the guild...'
            value={this.state.description}
            name='description'
            onChange={e => this.setState({ description: e.target.value })}
          />

          <Form.Group inline >
            <label>Type</label>
            <Form.Field
              control={Radio}
              label='Physical'
              value='Physical'
              name='type'
              checked={type === 'Physical'}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label='Mental'
              value='Mental'
              name='type'
              checked={type === 'Mental'}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label='Utility'
              value='Utility'
              name='type'
              checked={type === 'Utility'}
              onChange={this.handleChange}
            />
            <div>{this.typeValidate()}</div>
          </Form.Group>
          <Form>
            <Header as='h5' inverted>Guild Flag</Header>
            <Flag avatar={this.state.flag} handleClose={this.handleClose} />
          </Form>

          <Grid textAlign='center' padded>
            <Button color='brown' type='submit'>Submit</Button>
          </Grid>
        </Form>
      </Segment>
    )
  }
}

export default GuildCreate;    
