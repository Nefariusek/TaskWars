import React from 'react';
import { Segment, Button, Label, Table } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';

class ItemDescription extends React.Component {
  state = { item: null }

  useItem = async () => {
    const item = await fetch(`/api/item/${this.props.item._id}`)
      .then(response => response.json());
    if (!item) return;

    const charID = await fetch(`/api/users/me`, setHeaders())
      .then(response => response.json())
      .then(user => user.character_id);

    const character = await fetch(`/api/characters/${charID}`)
      .then(response => response.json());
    console.log(character);

    if (item.effect.includes('magic_power')) {
      await axios.put(`/api/characters/${charID}/magical_power`, { magical_power: `${character.magical_power + item.effect_value}` });
    }

    if (item.effect.includes('physical_power')) {
      await axios.put(`/api/characters/${charID}/physical_power`, { physical_power: `${character.physical_power + item.effect_value}` });
    }

    if (item.effect.includes('health') || item.effect.includes('hp')) {
      await axios.put(`/api/characters/${charID}/health`, { health: `${character.health + item.effect_value}` });
    }

  }

  componentDidMount() {
    if (this.props.item)
      this.setState({ item: this.props.item });
  }

  render() {
    return (
      <div>
        <Label attached='top right' >
          <Button size="tiny" icon='x' onClick={this.props.closeFun}></Button>
        </Label>
        <h2>{this.state.item !== null ? this.state.item.name : ' '}</h2>
        <p>{this.state.item !== null ? this.state.item.description : ' '}</p>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={2}><i>{this.state.item !== null ? 'Effect' : ' '}</i></Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.effect : ' '}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.item !== null ? 'Value' : ' '}</Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.effect_value : ' '}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.item !== null ? 'Slot' : ' '}</Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.slot : ' '}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.item !== null ? 'Price' : ' '}</Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.price : ' '}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button onClick={this.useItem} >Use</Button>
      </div>
    );
  }
}

export default ItemDescription;