import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import FinishTask from './finishTask';
import PauseTask from './pauseTask';

class MeasureTime extends React.Component {

  state = {
    startDate: '',
    now: '',
    taskDuration: '',
    timeToEnd: '',
    days: '',
    hours: '',
    minutes: '',
    pauseTime: ''
  }

  setTime = () => {
    const currentDate = new Date();
    this.setState({ now: currentDate, startDate: this.props.task.startFinishDate, taskDuration: this.props.task.duration });
  }



  setPauseTime = (pauseTime) => {
    this.setState({ pauseTime });
  }

  showDaysHoursMinutesTillEnd(t) {
    let cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(t / cd),
      h = Math.floor((t - d * cd) / ch),
      m = Math.round((t - d * cd - h * ch) / 60000);
    if (m === 60) {
      h++;
      m = 0;
    }
    if (h === 24) {
      d++;
      h = 0;
    }
    this.setState({ days: d, hours: h, minutes: m })
  }

  measureTime = async () => {
    await this.setTime();
    const timeFromBegining = (Date.parse(this.state.now) - Date.parse(this.state.startDate));
    let tillEnd;
    this.props.task.status === 'in_progress' ? tillEnd = this.state.taskDuration * 3600000 - timeFromBegining
      : tillEnd = this.state.taskDuration * 3600000 + this.state.pauseTime - timeFromBegining;
    this.setState({ timeToEnd: tillEnd });
    this.showDaysHoursMinutesTillEnd(this.state.timeToEnd);
  }

  onChange = async e => {
    await this.measureTime();
  }




  componentDidMount() {
    this.measureTime();
    this.Time = setInterval(() => this.measureTime(), 60000);

  }

  componentWillUnmount() {
    clearInterval(this.Time);
  }

  componentDidUpdate() {
  }

  render() {

    return (
      this.props.task.status === 'in_progress' ?
        <div>
          <Segment inverted textAlign='center' color='red' onChange={this.onChange}>
            {this.state.timeToEnd >= 0 ?
              `Time to end: ${this.state.days} Days ${this.state.hours} Hours ${this.state.minutes} Minutes` :
              `Time's up!`}
            <Icon name='bell' />
          </Segment>
          <FinishTask time={this.state} task={this.props.task} taskStateChanged={this.props.taskStateChanged} />
          {this.props.task.pausedAlready === true ? null :
            <PauseTask time={this.state} task={this.props.task} taskStateChanged={this.props.taskStateChanged} setPauseTime={this.setPauseTime} />}
        </div> : <PauseTask time={this.state} task={this.props.task} taskStateChanged={this.props.taskStateChanged} setPauseTime={this.setPauseTime} />
    );
  }
}

export default MeasureTime;






