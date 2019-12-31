import React from 'react';
import { Segment, Icon, Grid  } from 'semantic-ui-react';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import PublicRoute from '../PublicRoute';
import ItemView from './ItemView';
import InventoryView from '../Inventory/InventoryView';

class ShopContent extends React.Component {
  state = { items: [], id_user: 0, id_inventory: 0 , gold: 0, item: null, backpack: [], inventory: null }

  fetchItems = async () => {
    const response = await fetch('/api/item', setHeaders());
    console.log(response);
    const body = await response.json();
    console.log(body);
    this.setState({ items: body });
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    console.log(response);
    const body = await response.json();
    console.log(body);
    this.setState({ id_user: body.character_id });
    this.fetchInventory(this.state.id_user);
  }

  fetchInventory = async (character_id) => {
    const response = await fetch('/api/characters/'+character_id, setHeaders());
    console.log(response);
    const body = await response.json();
    console.log(body);
    this.setState({ id_inventory: body.inventory_id });
    this.fetchUserGold(this.state.id_inventory);
  }

  fetchUserGold = async (inventory_id) => {
    const response = await fetch('/api/inventory/'+inventory_id, setHeaders());
    console.log(response);
    const body = await response.json();
    console.log(body);
    this.setState({ gold: body.gold, backpack: body.backpack });
    this.getInventory();
  }

  fetchBuyItem = async (item) => {
    const resp = await axios({
      url: `/api/inventory/${this.state.id_inventory}/backpack`,
      method: 'put',
      data: {
        item: {
          _id: item._id,
        }
      },
      headers: setHeaders(),
    }).then(res => {
        console.log('Put item:',res);
        let afterPay = this.state.gold - item.price;
        this.setState({ gold: afterPay });
        this.fetchPayGold(afterPay);
      })
    .catch(error => console.error(error));
  }

  fetchPayGold = async (gold) => {
    await axios({
      url: `/api/inventory/${this.state.id_inventory}/gold`,
      method: 'put',
      data: {
        inventory: {
          gold: gold,
        }
      },
      headers: setHeaders(),
    }).then(res => {
        console.log('Pay for item:',res);
      })
    .catch(error => console.error(error));
  }


  componentDidMount() {
    this.fetchItems();
    this.fetchUser();

    console.log('mounted');
  }
  componentDidUpdate() {


  }
  getInventory = () => {
    let inventory = <InventoryView showGold={false} buttonActive={false} />
    // id_user={this.state.id_user}
    // id_inventory={this.state.id_inventory}
    // backpack={this.state.backpack}
    // gold={this.state.gold}
    // items={this.state.items}
    // showGold={false}/>
    this.setState({ inventory: inventory});
  }

  render() {
    let activeV;
    let disabledV;
    return (
      <Segment inverted>
      <Grid doubling container centered columns='equal' padded>
        <Grid.Row textAlign='center' verticalAlign='top'>
          <Grid.Column stretched>
            Your gold: ${this.state.gold}
            { this.state.inventory !== null ? this.state.inventory : `Your gold: ${this.state.gold}`}
          </Grid.Column> 
         </Grid.Row>

        {this.state.items.map(item => (
          <Grid.Column mobile={16} tablet={8} computer={4} stretched>
            <Segment inverted color='grey'>
              <ItemView item={item} gold={this.state.gold} buyItem={this.fetchBuyItem} buttonActive={true} />
            </Segment>
          </Grid.Column>
        ))}
      </Grid>
      </Segment> 
    );
  }
}

export default ShopContent;