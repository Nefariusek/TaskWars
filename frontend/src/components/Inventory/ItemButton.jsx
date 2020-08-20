import React from 'react';
import { Button, Item } from 'semantic-ui-react';

class ItemButton extends React.Component {
  state = { item: this.props.item }

  componentDidMount() {
    this.setState({ item: this.props.item });
  }

  chooseItem = () => {
    this.props.setDescription(this.state.item);
    this.props.handleOpen();
  }

  render() {
    return (
      <div>
        <Button inverted
          circular
          color='grey'
          onClick={this.chooseItem}
          disabled={this.props.bnActive} >
          <Item.Image src={this.props.item.picture} size="mini" wrapped />
        </Button>
      </div>
    );
  }
}

export default ItemButton;