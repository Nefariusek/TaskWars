import React from 'react';
import { Image, Segment, Table } from 'semantic-ui-react';


class ItemDescription extends React.Component {
  state = { item: null }

  componentDidMount() {
    if (this.props.item)
      this.setState({ item: this.props.item });
  }

  // equipped = () => {
  //   if (this.state.item.slot === 'Usable') {
  //     console.log('Use item and remove from inventory');
  //     this.useItem();
  //   } else {
  //     this.props.equippedThisItem(this.state.item);
  //   }
  // }
  // equipped = () => {
  //   if(this.props.eq === true) {
  //     if(this.state.item.slot === 'Usable') {
  //     } else {
  //       this.props.equippedThisItem(this.state.item);
  //     }
  //   } else { 
  //     this.props.unequippedThisItem(this.state.item);
  //     console.log('Unequipped item: getback to backpack');
  //   }
  // }



  render() {
    return (
      <Segment padded inverted color='black'>

        <h2>
          {this.state.item !== null ?
            <div>
              <Image src={this.state.item.picture} avatar />
              {this.state.item.name}
            </div> :
            ' '
          }
        </h2>
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
        <br></br><br></br>
        {/* <Label size='tiny' horizontal attached='bottom' size='tiny' color='grey'>
            {this.props.eq === true ?
                          <Button size="small" onClick={this.check} color='purple'>
                          { this.props.item.slot != null && this.props.item.slot === 'Usable' 
                          ? 'Use' : 
                          'Equipped'}
                        </Button> :
                        <Button size="small" onClick={this.check} color='purple'>
                        { this.props.item.slot != null && this.props.item.slot === 'Usable' 
                          ? 'None' : 
                          'Unequipped'}
                        </Button>
            }
        </Label> */}
      </Segment>
    );
  }
}

export default ItemDescription;