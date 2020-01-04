import React from 'react';
import { Container } from 'semantic-ui-react';
import CreaturePattern from './CreaturePattern';

class CreaturesTable extends React.Component {
  state = { 
      results: [] 
    };

  arrayToTable = arr => {
    let key = 0;
    return arr.map(elem => {
      return <CreaturePattern creature={elem} number={key} key={key++} />;
    });
  };

  render() {
    return <Container>{this.arrayToTable(this.state.results)}</Container>;
  }
}

export default CreaturesTable;
