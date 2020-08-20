import axios from 'axios';
import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';



class PauseTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      now: '',
      startDate: '',
      status: '',
      paused: false,
      pauseDate: '',
      pauseDuration: 24,
      pauseTime: '',
      pauseHours: '',
      pauseMinutes: '',
    }

  }


  //pause
  setTime = async () => {
    const currentDate = new Date();
    this.setState({ now: currentDate, startDate: this.props.task.pauseDate });
  }



  measurePause = async () => {
    await this.setTime();
    const timeFromBeginingOfPause = (Date.parse(this.state.now) - Date.parse(this.state.startDate));
    const tillPauseEnd = this.state.pauseDuration * 3600000 - timeFromBeginingOfPause;
    this.setState({ pauseTime: tillPauseEnd });
    await this.props.setPauseTime(this.state.pauseTime);
    this.showHoursMinutesTillPauseEnd(this.state.pauseTime);
    if (this.state.pauseTime <= 0) { return this.finishPause() } else { return null };
  }

  showHoursMinutesTillPauseEnd(t) {
    let cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(t / cd),
      h = Math.floor((t - d * cd) / ch),
      m = Math.round((t - d * cd - h * ch) / 60000);
    if (m === 60) {
      h++;
      m = 0;
    }
    this.setState({ pauseHours: h, pauseMinutes: m })
  }

  setStatus = async () => {
    return this.state.paused === true ? this.setState({ status: 'paused' }) : this.setState({ status: 'uncompleted' });
  }

  putDataForStart = async (task_id, questbook_id) => {
    await axios({
      url: `/api/questbook/${questbook_id}/task/${task_id}/pause`,
      method: 'put',
      headers: setHeaders(),
      data: { status: 'paused', pauseDate: new Date() }
    }).then((response) => {
      console.log(response);
    })
  }

  startPause = async () => {
    const user = await fetch('/api/users/me', setHeaders());
    const body = await user.json();
    const response = await fetch(`/api/characters/${body.character_id}`, setHeaders());
    const character = await response.json();
    await this.putDataForStart(this.props.task._id, character.questbook_id);
    this.setState({ paused: true })
    this.setStatus();
  }

  putDataForFinish = async (task_id, questbook_id) => {
    await axios({
      url: `/api/questbook/${questbook_id}/task/${task_id}/unpause`,
      method: 'put',
      headers: setHeaders(),
      data: { status: 'in_progress', pausedAlready: true }
    }).then((response) => {
      console.log(response);
    })
  }

  finishPause = async () => {
    const user = await fetch('/api/users/me', setHeaders());
    const body = await user.json();
    const response = await fetch(`/api/characters/${body.character_id}`, setHeaders());
    const character = await response.json();
    await this.putDataForFinish(this.props.task._id, character.questbook_id);
    this.setState({ paused: false })
    this.setStatus();
    await this.props.taskStateChanged(this.state.status);
  }


  onButtonSubmit = async e => {
    e.preventDefault();
    await this.startPause();
    await this.props.taskStateChanged(this.state.status);
  }

  onChange = async e => {
    await this.measurePause();

  }

  componentDidMount() {
    this.measurePause();
    this.Time = setInterval(() => this.measurePause(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.Time);
  }

  showPause = () => {
    if (this.props.task.status === "in_progress" && this.props.task.category !== 'Encounters') {
      return <div>
        <Button fluid icon color="yellow" style={{ marginTop: '15px' }} onClick={this.onButtonSubmit}>
          Pause task for 24 hours
          <Icon name="pause" />
        </Button>
      </div>
    } else if (this.props.task.status === 'paused') {
      return <div>
        <Segment inverted textAlign='center' color='grey' onChange={this.onChange}>
          Task paused for 24 hours. {this.state.pauseTime < 86400000 ? `Time to pause end: ${this.state.pauseHours} hours ${this.state.pauseMinutes} minutes` : null}
        </Segment>
      </div>
    } else if (this.props.task.category === 'Encounters') {
      return <Segment inverted textAlign='center' color='black'>
        This is Guild task! You can't pause it!
        </Segment>
    }
  }

  render() {

    return (
      this.showPause()
    );
  }
}

export default PauseTask;






