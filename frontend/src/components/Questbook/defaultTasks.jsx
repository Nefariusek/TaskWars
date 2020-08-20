import React from 'react';
import { Header, Icon, Item, Label, Loader, Popup, Segment, Step } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import TopPortal from '../Utils/TopPortal';
import CompletedTasks from './completedTasks';
import FailedTasks from './failedTasks';
import StartTask from './startTask';
import MeasureTime from './timeMeasure';


class AllTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskStateChange: null,
      loading: true
    }
  }

  getData = async (type) => {
    const user = await fetch('/api/users/me', setHeaders())
      .then(response => response.json());
    const character = await fetch(`/api/characters/${user.character_id}`)
      .then(response => response.json());
    let response;
    if (type === 'all') {
      response = await fetch(`/api/questbook/${character.questbook_id}/tasks`, setHeaders());
    }
    else if (type === 'completed') {
      response = await fetch(`/api/questbook/${character.questbook_id}/completed`, setHeaders());
    } else if (type === 'failed') {
      response = await fetch(`/api/questbook/${character.questbook_id}/failed`, setHeaders());
    } else {
      response = await fetch(`/api/questbook/${character.questbook_id}/uncompleted`, setHeaders());
    }
    const body = await response.json();
    this.setState(
      {
        tasks: body,
        loading: false
      }
    )
  }


  componentDidMount() {
    this.getData(this.props.type)
    console.log('mounted')
  }

  onTaskStateChange = (taskStateChange) => {
    this.setState({ taskStateChange });
    this.setState({ taskStateChange: null });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.type !== prevProps.type) {
      this.getData(this.props.type);
    }
    if (this.state.taskStateChange !== prevState.taskStateChange) {
      this.getData(this.props.type);
    }

  }

  pickImage(type) {

    if (type === 'Physical')
      return { name: 'bicycle', color: 'red', size: 'big' };

    if (type === 'Mental')
      return { name: 'book', color: 'brown', size: 'big' };

    if (type === 'Utility')
      return { name: 'globe', color: 'blue', size: 'big' };

    return { name: 'object group', color: 'orange', size: 'big' };
  }

  convertToDaysAndHours(t) {
    const cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000;
    let time = t * 3600000,
      d = Math.floor(time / cd),
      h = Math.floor((time - d * cd) / ch);
    if (h === 24) {
      d++;
      h = 0;
    }
    return `${d} days ${h} hours`
  }

  render() {
    return (
      <div>
        {this.state.tasks.reverse().map(x => (
          <Segment key={x._id} inverted>
            <Item>
              <Item.Image style={{ display: 'inline-block' }}>
                <Icon {...this.pickImage(x.type)} />
              </Item.Image>
              <Item.Header style={{ display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }} as={'h1'}>
                {x.name}
              </Item.Header>

              <Popup content='Type' trigger={
                <Label color='orange'>
                  {x.type}
                </Label>
              } />

              <Popup content='Category' trigger={
                <Label color='olive'>
                  {x.category}
                </Label>
              } />

              <Item.Description>
                <Segment.Group>
                  <Segment
                    inverted
                    textAlign='center'
                    color='purple'
                    style={{ padding: '2px 0px 0px 6px' }}>
                    <Header as='h5'>
                      Description
                            </Header>
                  </Segment>
                  <Segment>
                    {x.description}<br />
                  </Segment>
                </Segment.Group>
              </Item.Description>

              <Step.Group widths={4} size='tiny'>
                <Step style={{ padding: '2px' }}>
                  <Icon name='dot circle' color='yellow' />
                  <Step.Content>
                    <Step.Title>Gold</Step.Title>
                    <Step.Description>{x.gold}</Step.Description>
                  </Step.Content>
                </Step>
                <Step style={{ padding: '2px' }}>
                  <Icon name='star' color='violet' />
                  <Step.Content>
                    <Step.Title>Experience</Step.Title>
                    <Step.Description>{x.exp}</Step.Description>
                  </Step.Content>
                </Step>
                <Step style={{ padding: '2px' }}>
                  <Icon name='clock' color='teal' />
                  <Step.Content>
                    <Step.Title>Duration</Step.Title>
                    <Step.Description>{this.convertToDaysAndHours(x.duration)}</Step.Description>
                  </Step.Content>
                </Step>
                <Step style={{ padding: '2px' }}>
                  <Icon name='warning circle' color='red' />
                  <Step.Content>
                    <Step.Title>Penalty</Step.Title>
                    <Step.Description>{x.penalty} hp</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
              <Item.Extra >
                {x.status === '' ?
                  <StartTask task={x} taskStateChanged={this.onTaskStateChange} />
                  : null}
                {x.status === 'in_progress' || x.status === 'paused' ?
                  <MeasureTime task={x} taskStateChanged={this.onTaskStateChange} />
                  : null}
                {x.status === 'failed' ?
                  <FailedTasks />
                  : null}
                {x.status === 'completed' ?
                  <CompletedTasks />
                  : null}
              </Item.Extra>
              <Item.Extra>


              </Item.Extra>

            </Item>

            <TopPortal
              ref={this.portalRef}
              header={'Success!'}
              description={`${x.name} has been added to your questbook`}
            />

          </Segment >

        ))}
        {this.state.loading && (
          <Loader active size='huge' content='Loading...' inverted />
        )}</div>
    );
  }
}

export default AllTasks;    
