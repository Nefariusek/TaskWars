import React from 'react';
import { Menu, Icon, Container, Input, Button, Segment, Form, Grid } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import TaskTable from './TasksTable';

const tasksTypes = [
    { key: 0, text: 'All' },
    { key: 1, text: 'Daily' },
    { key: 2, text: 'Weekly' },
    { key: 3, text: 'Monthly' },
    { key: 4, text: 'Events' },
    { key: 5, text: 'Encounters' }
];

const tasksCategories = [
    { key: 0, text: 'All' },
    { key: 1, text: 'Physical' },
    { key: 2, text: 'Mental' },
    { key: 3, text: 'Utility' }
];


class MenuTasksFilter extends React.Component {
    constructor(props) {
        super(props);

        this.taskTableRef = React.createRef();
        this.state = {
            category: 'All',
            type: 'All',
            tags: '',
            results: []
        };
    }

    handleItemClickType = (e, { name }) => this.setState({ type: name });
    handleItemClickCategory = (e, { name }) => this.setState({ category: name });

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

    arrayToMenuCategory = ((arr) => {
        return arr.map(elem => {
            return (<Menu.Item
                name={elem.text}
                active={this.state.category === elem.text}
                icon={this.state.category === elem.text ? 'check circle outline' : 'circle outline'}
                onClick={this.handleItemClickCategory}
                key={elem.key}
            />);
        })
    })

    onSearchChange = (event) => {
        const str = event.target.value.toLowerCase();
        this.setState({ tags: str.split(" ").join("_") });
    }

    onSearchButtonClick = (event) => {
        this.fetchTasks();
    }

    fetchTasks = async () => {
        const tasks = await fetch(`/api/tasks/${this.state.category}&${this.state.type}&${this.state.tags}`, setHeaders())
            .then( response => response.json());

        this.setState({ results: tasks });
    }

    componentDidMount() {
        this.fetchTasks();

    }

    componentDidUpdate() {
        this.taskTableRef.current.setState({ results: this.state.results });
    }

    render() {
        return (
            <Container className='filterWrapper'>
                <Grid columns={10}>
                    <Grid.Column width={4}>
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
                                    {this.arrayToMenuType(tasksCategories)}
                                </Menu>

                                <Menu vertical inverted>
                                    <Menu.Item header>
                                        <Icon name='bars' fitted />Sort by category
                                    </Menu.Item>
                                    {this.arrayToMenuCategory(tasksTypes)}
                                </Menu>

                                <p style={{ color: 'gray', fontSize: '14px' }}>
                                    {`Found ${this.state.results.length} results...`}
                                </p>

                                <Button
                                    fluid
                                    animated
                                    color='blue'
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

                    <Grid.Column width={10}>
                        <TaskTable ref={this.taskTableRef} />
                    </Grid.Column>
                </Grid>

            </Container>
        );
    }
}

export default MenuTasksFilter;