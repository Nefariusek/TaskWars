import React from 'react';
import { Button, Container, Form, Grid, Icon, Input, Loader, Menu, Segment } from 'semantic-ui-react';
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
            results: [],
            loading: true
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
        const user = await fetch('/api/users/me', setHeaders())
            .then(response => response.json());
        const character = await fetch(`/api/characters/${user.character_id}`)
            .then(response => response.json());

        const usersTasks = await fetch(`/api/questbook/${character.questbook_id}/tasks`, setHeaders())
            .then(response => response.json());

        const allTasks = await fetch(`/api/tasks/${this.state.category}&${this.state.type}&${this.state.tags}`, setHeaders())
            .then(response => response.json());

        const actDate = new Date();

        const tasks = allTasks.filter(task => {
            return (usersTasks.every(uTask => {
                return (
                    (uTask.name !== task.name && uTask.description !== task.description) ||
                    ((uTask.status !== 'in_progress' && uTask.status !== '' && uTask.status !== 'paused') &&
                    (categoryFilter(uTask, actDate))))
            }));
        });

        this.setState({ results: tasks, loading: false });
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
                        {this.state.loading && (
                            <Loader active size='huge' content='Loading...' inverted />
                        )}

                        <TaskTable ref={this.taskTableRef} />
                    </Grid.Column>
                </Grid>

            </Container>
        );
    }
}

function categoryFilter(task, actDate) {
    if (task.category === 'Daily') {
        return actDate - new Date(task.creationTime) > 86400000;
    } else if (task.category === 'Weekly') {
        return actDate - new Date(task.creationTime) > 604800000;
    } else if (task.category === 'Monthly') {
        const taskDate = new Date(task.creationTime);
        return actDate - taskDate > new Date(taskDate.getFullYear(), taskDate.getMonth() + 1, 0).getDate() * 86400000;
    }

    return true;
}

export default MenuTasksFilter;