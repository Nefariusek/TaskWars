import React from 'react';
import { Button, Header, Icon, Item, Label, Popup, Segment, Step } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import TopPortal from '../Utils/TopPortal';
const axios = require('axios');

class TaskPattern extends React.Component {
    constructor(props) {
        super(props);

        this.portalRef = React.createRef();
        this.portalFailRef = React.createRef();
        this.state = { open: false, fail: false }
    }

    parseTime = (hours) => {
        const days = Math.floor(hours / 24);
        const hr = hours - (days * 24);

        return (`${days > 0 ? days + 'd' : ''} ${hr >= 0 ? hr + 'h' : ''}`)
    }

    handleButtonAddClick = async (e, { name }) => {
        this.setState({ open: true });
        const user = await fetch('/api/users/me', setHeaders())
            .then(response => response.json());
        const character = await fetch(`/api/characters/${user.character_id}`)
            .then(response => response.json());

        const taskToInsert = {
            "name": `${this.props.task.name}`,
            "description": `${this.props.task.description}`,
            "type": `${this.props.task.type}`,
            "category": `${this.props.task.category}`,
            "duration": `${this.props.task.duration}`,
            "exp": `${this.props.task.exp}`,
            "gold": `${this.props.task.gold}`,
            "penalty": `${this.props.task.penalty}`,
            "status": ""
        };

        const res = await axios.put(`/api/questbook/${character.questbook_id}/task`, taskToInsert)
            .catch(err => {
                this.portalFailRef.current.handleOpen();
                this.setState({ open: false });
            });

        if (res && res.status === 200)
            this.portalRef.current.handleOpen();
    }

    pickImage() {
        if (this.props.task.type === 'Physical')
            return { name: 'bicycle', color: 'red', size: 'big' };

        if (this.props.task.type === 'Mental')
            return { name: 'book', color: 'brown', size: 'big' };

        if (this.props.task.type === 'Utility')
            return { name: 'globe', color: 'blue', size: 'big' };

        return { name: 'object group', color: 'orange', size: 'big' };
    }

    render() {
        return (
            <Segment inverted>
                <Item>
                    <Item.Image style={{ display: 'inline-block' }}>
                        <Icon {...this.pickImage()} />
                    </Item.Image>
                    <Item.Header style={{ display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }} as={'h1'}>
                        {this.props.task.name}
                    </Item.Header>

                    <Popup content='Type' trigger={
                        <Label color='orange'>
                            {this.props.task.type}
                        </Label>
                    } />

                    <Popup content='Category' trigger={
                        <Label color='olive'>
                            {this.props.task.category}
                        </Label>
                    } />

                    <Item.Description>
                        <Segment.Group>
                            <Segment
                                inverted
                                textAlign='center'
                                color='purple'
                                style={{ padding: '2px 0px 0px 6px' }}>
                                <Header as='h5'>
                                    Description
                                </Header>
                            </Segment>
                            <Segment>
                                {this.props.task.description}<br />
                            </Segment>
                        </Segment.Group>
                    </Item.Description>

                    <Step.Group widths={4} size='tiny'>
                        <Step style={{ padding: '2px' }}>
                            <Icon name='dot circle' color='yellow' />
                            <Step.Content>
                                <Step.Title>Gold</Step.Title>
                                <Step.Description>{this.props.task.gold}</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step style={{ padding: '2px' }}>
                            <Icon name='star' color='violet' />
                            <Step.Content>
                                <Step.Title>Experience</Step.Title>
                                <Step.Description>{this.props.task.exp}</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step style={{ padding: '2px' }}>
                            <Icon name='clock' color='teal' />
                            <Step.Content>
                                <Step.Title>Duration</Step.Title>
                                <Step.Description>{this.parseTime(this.props.task.duration)}</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step style={{ padding: '2px' }}>
                            <Icon name='warning circle' color='red' />
                            <Step.Content>
                                <Step.Title>Penalty</Step.Title>
                                <Step.Description>{this.props.task.penalty} hp</Step.Description>
                            </Step.Content>
                        </Step>
                    </Step.Group>

                    <Item.Extra>
                        <Button
                            fluid
                            icon
                            color={this.state.open === false ? 'blue' : 'green'}
                            labelPosition='right'
                            onClick={this.handleButtonAddClick}
                            disabled={this.state.open}>
                            <Icon name={this.state.open === false ? 'plus' : 'check'} />
                            {this.state.open === false ? 'Add to questbook' : 'Added to questbook'}
                        </Button>
                    </Item.Extra>

                </Item>

                <TopPortal
                    ref={this.portalRef}
                    header={'Success!'}
                    description={`${this.props.task.name} has been added to your questbook`}
                />

                <TopPortal
                    ref={this.portalFailRef}
                    header={'Fail!'}
                    description={`We were unable to add ${this.props.task.name} to your questbook`}
                />

            </Segment >
        );
    }
}

export default TaskPattern;