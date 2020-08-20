import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Table } from 'semantic-ui-react';
import StatisticsRow from './StatisticsRow';

class Statistics extends React.Component {

    getClassImage = (c) => {
        if (c === "Warrior") return `https://cdn0.iconfinder.com/data/icons/viking-6/64/Axe-weapon-warrior-battle-512.png`;
        if (c === "Hunter") return `https://cdn1.iconfinder.com/data/icons/outlined-medieval-icons-pack/200/weapons_bow-512.png`;
        if (c === "Mage") return `https://cdn1.iconfinder.com/data/icons/outlined-medieval-icons-pack/200/magic_wizard_hat-512.png`;
        if (c === "Druid") return `https://cdn1.iconfinder.com/data/icons/outlined-medieval-icons-pack/200/magic_staff-512.png`;
        return `https://cdn4.iconfinder.com/data/icons/jetflat-2-people-1/60/006_001_man_human_father_parent-512.png`;
    }

    render() {
        return (
            <Segment inverted className="statistics">
                <Table basic='very' celled collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{ color: "white" }}>Character Statistic</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <StatisticsRow name="Class" value={this.props.class} image={this.getClassImage(this.props.class)} />
                        <StatisticsRow name="Physical Power" value={this.props.physical} image="https://image.flaticon.com/icons/png/512/834/premium/834240.png" />
                        <StatisticsRow name="Magical Power" value={this.props.magical} image="https://cdn3.iconfinder.com/data/icons/halloween-2243/512/Halloween_magic-cap-witch-wizzard-512.png" />
                    </Table.Body>
                </Table>
            </Segment>
        );
    }
}

export default Statistics;