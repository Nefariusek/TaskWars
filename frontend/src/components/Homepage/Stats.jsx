import React from 'react';
import { Divider, Header, Item, Segment } from 'semantic-ui-react';

class Stats extends React.Component {
    constructor(props) {
        super(props);

        this.state = { userCount: '', tasksCompleted: '' };
    }

    getUsersAndTasks = async () => {
        const userCnt = await fetch('/api/users/count')
            .then(response => response.json());

        const tasksCnt = await fetch('/api/questbook/count')
            .then(response => response.json());
        this.setState({ userCount: userCnt, tasksCompleted: tasksCnt });
    }

    componentDidMount() {
        this.getUsersAndTasks();
    }

    render() {
        return (
            <Segment textAlign='center' color='green' inverted>
                <Segment inverted style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}} >
                    
                        <Item>
                            <Header as='h1' inverted >JOIN</Header>
                            <Header as='h3' inverted >coumunity which has</Header>
                            <Header as='h1' inverted >{this.state.userCount} users</Header>
                        </Item>
                        <Divider />
                        <Item>
                            <Header as='h1' inverted >TOGETHER</Header>
                            <Header as='h3' inverted >we were able to complete</Header>
                            <Header as='h1' inverted >{this.state.tasksCompleted} tasks</Header>
                        </Item>
                    
                </Segment>

            </Segment>
        );
    }
}

export default Stats;