import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Header, Progress, Segment } from 'semantic-ui-react';


class HealthBar extends React.Component {

    render() {
        return (
            <Segment inverted id="progressDiv">
                <Header id="progressLabel" as='h4'>Health</Header>
                <Progress id="progressBar" color='red' value={this.props.health} total={this.props.maxHealth} />
                <Header id="progressCounter" as='h4'>{this.props.health}/{this.props.maxHealth}</Header>
            </Segment>
        );
    }
}

export default HealthBar