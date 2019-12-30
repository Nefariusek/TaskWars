import React from 'react';
import { Menu, Icon, Container, Input, Button, Segment, Form, Grid } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import GuildTable from './guildTable';

const guildCategories = [
  { key: 0, text: 'All' },
  { key: 1, text: 'Physical' },
  { key: 2, text: 'Mental' },
  { key: 3, text: 'Utility' }
];


class MenuGuildFilter extends React.Component {
  constructor(props) {
    super(props);

    this.guildTableRef = React.createRef();
    this.state = {
      type: 'All',
      tags: '',
      results: []
    };
  }

  handleItemClickType = (e, { name }) => this.setState({ type: name });

  arrayToMenuType = ((arr) => {
    return arr.map(elem => {
      return (<Menu.Item
        name={elem.text}
        active={this.state.type === elem.text}
        icon={this.state.type === elem.text ? 'check circle outline' : 'circle outline'}
        onClick={this.handleItemClickType}
        key={elem.key}
      />);
    })
  })

  onSearchChange = (event) => {
    const str = event.target.value.toLowerCase();
    this.setState({ tags: str.split(" ").join("_") });
  }

  onSearchButtonClick = (event) => {
    this.fetchGuild();
  }

  fetchGuild = async () => {
    const guild = await fetch(`/api/guilds/search/${this.state.type}&${this.state.tags}`, setHeaders())
      .then(response => response.json());

    this.setState({ results: guild });
  }

  componentDidMount() {
    this.fetchGuild();

  }

  componentDidUpdate() {
    this.guildTableRef.current.setState({ results: this.state.results });
  }

  render() {
    return (
      <Grid>
        <Grid.Column floated='left' padded='true' mobile={16} tablet={8} computer={4}>
          <Segment style={{ display: 'inline-block' }} inverted>
            <Form >
              <Input
                fluid
                placeholder='Tags...'
                icon='search'
                onChange={this.onSearchChange}
              />

              <Menu vertical inverted>
                <Menu.Item header>
                  <Icon name='bars' fitted />Sort by type
                </Menu.Item>
                {this.arrayToMenuType(guildCategories)}
              </Menu>

              <p style={{ color: 'gray', fontSize: '14px' }}>
                {`Found ${this.state.results.length} results...`}
              </p>

              <Button
                fluid
                animated
                color='green'
                size='huge'
                onClick={this.onSearchButtonClick}>
                <Button.Content visible>
                  Search
                  </Button.Content>

                <Button.Content hidden>
                  <Icon name='search' />
                </Button.Content>
              </Button>
            </Form>
          </Segment>
        </Grid.Column>

        <Grid.Column floated='right' mobile={16} computer={10}>
          <GuildTable ref={this.guildTableRef} />
        </Grid.Column>

      </Grid>
    );
  }
}

export default MenuGuildFilter;