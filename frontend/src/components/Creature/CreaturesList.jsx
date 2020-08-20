import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Header, Input, Loader, Segment } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import CreaturesTable from './CreaturesTable';

class CreatureList extends React.Component {
  state = {
    name: '',
    results: [],
    loading: true,
  };

  creaturesTableRef = React.createRef();
  static contextType = Store;

  getCreatures = async () => {
    await axios({
      url: `api/creatures/${this.state.name}`,
      method: 'get',
      headers: setHeaders(),
    }).then(
      response => {
        this.setState({ results: response.data, loading: false });
      },
      error => {
        console.log(error);
      },
    );
  };

  componentDidMount() {
    this.getCreatures();
  }

  componentDidUpdate() {
    this.creaturesTableRef.current.setState({ results: this.state.results });
  }

  onSearchChange = e => {
    const input = e.target.value.toLowerCase();
    this.setState({ name: input.split(' ').join('_') });
  };

  onSearchButtonClick = e => {
    this.getCreatures();
  };

  render() {
    if (!this.context.hasCharacter) return <Redirect to="/" />;
    if (!this.context.isLeader) return <Redirect to="/" />;
    return (
      <div>
        <Segment inverted>
          <Header>Creature Type</Header>
          <Input fluid placeholder="Name" icon="search" onChange={this.onSearchChange} />
          <Button color="brown" onClick={this.onSearchButtonClick}>
            Search
          </Button>
        </Segment>

        <CreaturesTable ref={this.creaturesTableRef} />
        {this.state.loading && <Loader active size="huge" content="Loading..." inverted />}
      </div>
    );
  }
}

export default CreatureList;
