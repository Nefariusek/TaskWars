import axios from 'axios';
import React from 'react';
import { Button, Form, Header, Input, Message, Radio, Segment, Select, TextArea } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import ErrorMessage from '../ErrorMessage';
import TopPortal from '../Utils/TopPortal';

const options = [
  { key: 'd', text: 'Daily', value: 'Daily' },
  { key: 'w', text: 'Weekly', value: 'Weekly' },
  { key: 'm', text: 'Monthly', value: 'Monthly' },
  { key: 'ev', text: 'Events', value: 'Events' },
]

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.portalRef = React.createRef();
    this.state = {
      name: '',
      description: '',
      type: '',
      category: '',
      duration: '',
      exp: '',
      gold: '',
      penalty: '',
      status: '',
      submitStatus: false,
      days: '',
      hours: '',
      taskAdded: null,
      open: false,

    }
  }



  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    console.log(body.character_id);
    this.fetchCharacter(body.character_id);

  }


  fetchCharacter = async (id) => {
    const response = await fetch(`/api/characters/${id}`, setHeaders());
    const body = await response.json();
    console.log(body.questbook_id);
    this.postData(body.questbook_id, this.state);


  }

  postData = async (questbook_id, state) => {
    let data = state;
    console.log(data);
    await axios({
      url: `/api/questbook/${questbook_id}/task`,
      method: 'post',
      headers: setHeaders(),
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        category: data.category,
        duration: `${data.hours * 1 + data.days * 24}`,
        exp: data.exp,
        gold: data.gold,
        penalty: data.penalty,
        status: data.status
      }
    }).then((response) => {
      if (response.status === 200) {
        // this.setState({taskAdded: true});
        this.portalRef.current.handleOpen();
        new Promise(res => setTimeout(res, 3500));
        this.setState({ open: false });
      } else {
        this.setState({ open: false });
      }
    }, (error) => {
      console.log(error)
    });
  }



  onButtonSubmit = async e => {
    e.preventDefault();
    this.setState({ submitStatus: true })
    console.log(this.state);
    await this.fetchUser();


  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })


  nameValidate = (e) => {
    if (this.state.name === '' && this.state.submitStatus) {
      return { content: <ErrorMessage message='Name shoud have between 5 and 50 characters' /> }
    }
    else { return null }

  }
  descriptionValidate = (e) => {
    if (this.state.description === '' && this.state.submitStatus) {
      return { content: <ErrorMessage message='Description shoud have between 5 and 50 characters' /> }
    }
    else { return null }

  }
  categoryValidate = (e) => {
    if (this.state.category === '' && this.state.submitStatus) {
      return { content: <ErrorMessage message='Choose category' /> }
    }
    else { return null }

  }
  typeValidate = (e) => {
    if (this.state.type === '' && this.state.submitStatus) {
      return <Message negative content={<ErrorMessage message='Choose type' />} />
    }
    else { return null }

  }
  penaltyValidate = (e) => {
    if (this.state.penalty === '' && this.state.submitStatus) {
      return { content: <ErrorMessage message='Type penalty' /> }
    }
    else { return null }

  }
  goldValidate = (e) => {
    if (this.state.gold === '' && this.state.submitStatus) {
      return { content: <ErrorMessage message='Type gold' /> }
    }
    else { return null }

  }
  expValidate = (e) => {
    if (this.state.exp === '' && this.state.submitStatus) {
      return { content: <ErrorMessage message='Type exp' /> }
    }
    else { return null }

  }
  hoursValidate = (e) => {
    if (this.state.hours === '' && this.state.submitStatus) {
      return { content: <ErrorMessage message='Type hours' /> }
    }
    else { return null }

  }
  daysValidate = (e) => {
    if (this.state.days === '' && this.state.submitStatus) {
      return { content: <ErrorMessage message='Type days' /> }
    }
    else { return null }

  }




  render() {
    const { name,
      description,
      type,
      category,
      exp,
      gold,
      penalty,
      days,
      hours
    } = this.state




    return (
      <div>
        <Segment inverted>
          {this.state.taskAdded === true ?
            <Message color='green' header='Success' content='Task added' /> : null}
          <Form inverted onSubmit={this.onButtonSubmit}>
            <Header inverted>Add new task</Header>

            <Form.Group widths='equal'>
              <Form.Input
                error={this.nameValidate()}
                label='Task name'
                placeholder='Task name'
                name='name'
                value={name}
                onChange={this.handleChange}
              />

              <Form.Field
                error={this.categoryValidate()}
                control={Select}
                label='Category'
                options={options}
                placeholder='Category'
                value={category}
                name='category'
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Field
              error={this.descriptionValidate()}
              control={TextArea}
              label='Description'
              placeholder='Write description of the task...'
              value={description}
              name='description'
              onChange={this.handleChange}
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
            </Form.Group>
            {this.typeValidate()}
            <Form.Group widths='equal'>
              <Form.Field
                error={this.daysValidate()}
                control={Input}
                type={<input type='number' />}
                label='Duration: days'
                placeholder='Days'
                value={days}
                name='days'
                onChange={this.handleChange}
              />
              <Form.Field
                error={this.hoursValidate()}
                control={Input}
                type={<input type='number' />}
                label='hours'
                placeholder='Hours'
                value={hours}
                name='hours'
                onChange={this.handleChange}
              />
              <Form.Field
                error={this.penaltyValidate()}
                control={Input}
                type={<input type='number' />}
                label='Penalty'
                placeholder='Penalty'
                value={penalty}
                name='penalty'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                error={this.goldValidate()}
                control={Input}
                type={<input type='number' />}
                label='Gold'
                placeholder='Gold'
                value={gold}
                name='gold'
                onChange={this.handleChange}
              />
              <Form.Field
                error={this.expValidate()}
                control={Input}
                type={<input type='number' />}
                label='Exp'
                placeholder='Exp'
                value={exp}
                name='exp'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Field control={Button} >Submit</Form.Field>
          </Form>
        </Segment>
        <TopPortal
          ref={this.portalRef}
          header={'Success!'}
          description={`${this.state.name} has been added to your questbook`}
        />
      </div>
    );
  }
}

export default AddTask;






