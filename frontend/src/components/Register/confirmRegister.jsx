import React from 'react';
import { Grid, Message } from 'semantic-ui-react';

class Confirmed extends React.Component {
  render() {
    return (
      <Grid centered>
        <Message
          success
          header='Account created, check your email'
        />
      </Grid>
    );
  }
};

export default Confirmed