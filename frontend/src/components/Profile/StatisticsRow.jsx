import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Header, Image, Table } from 'semantic-ui-react';

class StatisticsRow extends React.Component {

    render() {
        return (
            <Table.Row>
                <Table.Cell>
                    <Header style={{ color: "white" }} as='h4' image>
                        <Image src={this.props.image} rounded size='mini' />
                        <Header.Content>
                            {this.props.name}
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell style={{ color: "white" }} id='statisticValue'>
                    <h4>{this.props.value}</h4>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default StatisticsRow;


