import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Creature from '../Creature';
import GuildCreating from './guildCreating';
import GuildDetails from './guildDetails';
import GuildJoin from './guildJoin';
import GuildMenu from './guildMenu';
import YourGuilds from './yourGuilds';

const GuildContent = () => {
  return (
    <BrowserRouter>
      <Container text>
        <GuildMenu />
        <Switch>
          <Route exact path="/guildCreate" component={GuildCreating} />
          <Route exact path="/guildJoin" component={GuildJoin} />
          <Route exact path="/guild" component={YourGuilds} />
          <Route exact path="/guildDetails" component={GuildDetails} />
          <Route exact path="/creatures" component={Creature} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default GuildContent;