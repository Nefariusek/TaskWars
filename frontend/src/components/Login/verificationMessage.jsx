import React from 'react';
import { Container, Form, Grid, Message, Segment } from 'semantic-ui-react';


class Verified extends React.Component {

  render() {
    return (
      <Grid centered padded>
        <Form warning success onSubmit={this.onButtonSubmit}>
          <Segment compact>
            <Message
              warning
              header='Your email has not been verified yet. Go to your e-mail account and click on the verification link.'
            />
            <Container fluid>
              Emial {localStorage.email} is not verified!
          </Container>
          </Segment>
        </Form>
      </Grid>
    );
  }
};

export default Verified