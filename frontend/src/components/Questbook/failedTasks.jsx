import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

class FailedTasks extends React.Component {

  render() {
    return (
      <Segment inverted textAlign='center' color="red">
        Unfortunately you failed this task! Next time you will make it!
      <Icon name="thumbs up" /></Segment>
    )
  }
}

export default FailedTasks;    
