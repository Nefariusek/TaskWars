import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ConfirmRegister from './confirmRegister';
import Register from './register';

const RegisterContent = () => {
  return (
    <BrowserRouter>
      <Container text>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/register/confirm" component={ConfirmRegister} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default RegisterContent;
