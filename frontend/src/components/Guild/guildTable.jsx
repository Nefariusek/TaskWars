import React from 'react';
import { Container } from 'semantic-ui-react';
import GuildPattern from './guildPattern';

class GuildTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: [] }
  }


  arrayToTable = ((arr) => {
    let key = 0;
    return arr.map(elem => {
      return (
        <GuildPattern guild={elem} userId={this.props.userId} key={key++} handleClose={this.props.handleClose} />
      );
    })
  })

  componentDidMount() {
  }

  render() {

    return (
      <Container>{this.arrayToTable(this.state.results)}</Container>
    );
  }
}

export default GuildTable;