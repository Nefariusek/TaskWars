import React from 'react';
import { Button } from 'semantic-ui-react';

class ItemEquipped extends React.Component {
  state = { item: this.props.item }

  componentDidMount() {
    this.setState({ item: this.props.item });
  }

  chooseAction = () => {
    console.log('Chose action', this.state.item);
  }

  render() {
    return (
      <div>
        <Button inverted
          color='grey'
          onClick={this.chooseAction} >

        </Button>
      </div>
    );
  }
}

export default ItemEquipped;