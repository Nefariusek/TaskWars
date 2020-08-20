import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

class CompletedTasks extends React.Component {


  render() {
    return (
      <Segment inverted textAlign='center' color="green">
        Good job! You made it! Congratulations!
      <Icon name="bolt" /></Segment>
    );
  }
}

export default CompletedTasks;    
