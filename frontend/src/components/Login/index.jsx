import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LoginPanel from './loginPanel';
import VerificationMessage from './verificationMessage';

const LoginContent = () => {
  return (
    <BrowserRouter>
      <Container text>
        <Switch>
          <Route exact path="/login" component={LoginPanel} />
          <Route exact path="/login/notVerified" component={VerificationMessage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default LoginContent;
