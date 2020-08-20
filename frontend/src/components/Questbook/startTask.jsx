import axios from 'axios';
import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';



class StartTask extends React.Component {

  state = {
    status: '',
    date: ''
  }

  putData = async (task_id, questbook_id) => {
    await axios({
      url: `/api/questbook/${questbook_id}/task/${task_id}`,
      method: 'put',
      headers: setHeaders(),
      data: { status: "in_progress" }
    }).then(() => {
      this.setState({ status: "in_progress" })
    })
  }

  startTask = async () => {
    const user = await fetch('/api/users/me', setHeaders());
    const body = await user.json();
    const response = await fetch(`/api/characters/${body.character_id}`, setHeaders());
    const character = await response.json();
    await this.putData(this.props.task._id, character.questbook_id);
    this.setState({ date: new Date() })
  }



  onButtonSubmit = async e => {
    e.preventDefault();
    await this.startTask();
    this.props.taskStateChanged(this.state.status);

  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {

  }

  pickColor() {
    if (this.props.task.status === '')
      return { color: 'blue' };
    if (this.props.task.status === 'in_progress')
      return { color: 'yellow' };
  }

  pickContent() {
    if (this.props.task.status === '')
      return 'Start task';
    if (this.props.task.status === 'in_progress')
      return 'Task in progress!';
  }

  pickIcon() {
    if (this.props.task.status === '')
      return { name: 'chevron right' };
    if (this.props.task.status === 'in_progress')
      return { name: 'clock' };
  }

  render() {

    return (
      <div>
        {this.props.task.status === '' ?
          <Button fluid icon labelPosition='right' {...this.pickColor()} onClick={this.onButtonSubmit} >
            {this.pickContent()}
            <Icon {...this.pickIcon()} />
          </Button> : <Segment fluid icon inverted textAlign='center' {...this.pickColor()}>
            {this.pickContent()}
            <Icon {...this.pickIcon()} />
          </Segment>}</div>
    );
  }
}

export default StartTask;






