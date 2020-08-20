import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Header, Segment, Table } from 'semantic-ui-react';

class Guilds extends React.Component {

    renderList() {
        return this.props.guilds.map(name => {
            return (
                <div className="guildName" key={name}>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4' image>
                                <Header.Content style={{ color: "white" }}>
                                    {name}
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                    </Table.Row>
                </div>
            );
        });
    }

    render() {
        return (
            <Segment inverted className="guild">
                <Table style={{ width: "100%" }} basic='very' celled collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{ color: "white" }}>Character Guilds</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <div className="guildsList">{this.renderList()}</div>
                    </Table.Body>
                </Table>
            </Segment>
        );
    }
}

export default Guilds;