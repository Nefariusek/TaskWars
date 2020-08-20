import axios from 'axios';
import React from 'react';
import { Dimmer, Grid, Label, Loader, Segment } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import ItemView from './ItemView';

class InventoryView extends React.Component {
  state = {
    id_user: null,
    character: null,
    id_inventory: null,
    backpack: [],
    gold: null,
    items: [],
    backpackItem: [],
    itemDescription: null,
    equippedItems: [],
    equipped: [],
    allowItemSlot: ['', 'Weapon', 'Head', 'Body', 'Boots', 'Usable'],
    itemView: null,
    itemEquippedView: null,
  }

  checkAllowItemSlot = () => {
    const eqItem = this.state.equipped;
    if (eqItem !== []) {
      const allowSlot = this.state.allowItemSlot;
      const aS = allowSlot.filter((slot) => {
        return eqItem.find((it) => it.slot === slot ? true : false) === undefined
      });
      this.setState({ allowItemSlot: aS })
    }
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    this.setState({ id_user: body.character_id });
    this.fetchInventory(this.state.id_user);
  }

  fetchInventory = async (character_id) => {
    const response = await fetch('/api/characters/' + character_id, setHeaders());
    const body = await response.json();
    this.setState({ id_inventory: body.inventory_id, character: body });
    this.fetchGetInventory(this.state.id_inventory);
  }

  fetchGetInventory = async (id_inventory) => {
    const response = await fetch('/api/inventory/' + id_inventory, setHeaders());
    const body = await response.json();
    this.setState({ backpack: body.backpack, gold: body.gold, equippedItems: body.equippedItems });
    this.putItemInBackpack();
    this.checkAllowItemSlot();

    this.createItemView();
    this.createItemEquippedView();
  }

  fetchItems = async () => {
    const response = await fetch('/api/item', setHeaders());
    const body = await response.json();
    this.setState({ items: body });
    this.putItemInBackpack();
    this.checkAllowItemSlot();

  }

  putItemInBackpack() {
    let bag = [];
    let equipped = [];
    this.state.backpack.forEach(itemId => {
      let itemInInven = this.state.items.find((it) => { if (it._id === itemId) return it; return null; });
      bag.push(itemInInven);
    });
    this.state.equippedItems.forEach(itemId => {
      let itemInInven = this.state.items.find((it) => { if (it._id === itemId) return it; return null; });
      equipped.push(itemInInven);
    });
    this.setState({ backpackItem: bag, equipped: equipped });
    this.createItemView();
    this.createItemEquippedView();
  }

  componentDidMount() {
    if (!this.props.id_user && !this.props.id_inventory && !this.props.backpack &&
      !this.props.gold && !this.props.items) {
      this.fetchUser();
      this.fetchItems();
    } else {
      this.setState({
        id_user: this.props.id_user,
        id_inventory: this.props.id_inventory,
        backpack: this.props.backpack,
        gold: this.props.gold,
        items: this.props.items,
      });
      this.putItemInBackpack();
    }
    this.createItemView();
    this.createItemEquippedView();
  }

  useUsableItem = async (item) => {
    this.checkAllowItemSlot();

    await this.fetchRemoveFromBackpack(item);
    await this.fetchGetInventory(this.state.id_inventory);

  }

  equippedItem = async (item) => {
    this.checkAllowItemSlot();
    if (this.state.allowItemSlot.find((it) => item.slot === it) !== undefined) {
      const isItem = this.state.allowItemSlot.filter((it) => it !== item.slot);

      await this.fetchEquipped(item);
      let equipped = this.state.equipped;
      this.setState({ equipped: equipped, allowItemSlot: isItem });
      await this.fetchRemoveFromBackpack(item);

      await this.fetchGetInventory(this.state.id_inventory);

    } else {
      console.log('You have this sloth in use');
    }
  }

  unequippedItem = async (item) => {
    let isItem = this.state.allowItemSlot;
    isItem.push(item.slot);

    await this.fetchBackpack(item);
    let backpack = this.state.backpack;

    this.setState({ backpack: backpack, allowItemSlot: isItem });

    await this.fetchRemoveFromEquipped(item);
    await this.fetchGetInventory(this.state.id_inventory);
    this.checkAllowItemSlot();
  }

  fetchRemoveFromEquipped = async (item) => {
    await axios({
      url: `/api/inventory/${this.state.id_inventory}/equippedItems/${item._id}`,
      method: 'put',
      data: {
        item: {
          _id: item._id,
        }
      },
      headers: setHeaders(),
    })
      .catch(error => console.error(error));
  }

  fetchRemoveFromBackpack = async (item) => {
    await axios({
      url: `/api/inventory/${this.state.id_inventory}/backpack/${item._id}`,
      method: 'put',
      data: {
        item: {
          _id: item._id,
        }
      },
      headers: setHeaders(),
    })
      .catch(error => console.error(error));
  }

  fetchEquipped = async (item) => {
    await axios({
      url: `/api/inventory/${this.state.id_inventory}/equippedItems`,
      method: 'put',
      data: {
        item: {
          _id: item._id,
        }
      },
      headers: setHeaders(),
    })
      .catch(error => console.error(error));
  }

  fetchBackpack = async (item) => {
    await axios({
      url: `/api/inventory/${this.state.id_inventory}/backpack`,
      method: 'put',
      data: {
        item: {
          _id: item._id,
        }
      },
      headers: setHeaders(),
    })
      .catch(error => console.error(error));
  }

  useItem = async (item, sign) => {
    console.log('Use item ,', item.name);
    const charID = this.state.id_user;
    const character = this.state.character;

    if (item.effect.includes('magic_power')) {
      await axios.put(`/api/characters/${charID}/magical_power`, { magical_power: `${character.magical_power + (sign * item.effect_value)}` });
    }

    if (item.effect.includes('physical_power')) {
      await axios.put(`/api/characters/${charID}/physical_power`, { physical_power: `${character.physical_power + (sign * item.effect_value)}` });
    }

    if (item.effect.includes('health') || item.effect.includes('hp')) {
      await axios.put(`/api/characters/${charID}/health`, { health: `${character.health + (sign * item.effect_value)}` });
    }

  }

  createItemView = () => {
    const itemView = <ItemView
      backpackItem={this.state.backpackItem}
      setDescription={this.setDescription}
      buttonActive={this.props.buttonActive}
      eq={true}
      description={this.state.itemDescription}
      equippedItem={this.equippedItem}
      unequippedItem={this.unequippedItem}
      useUsableItem={this.useUsableItem}
      useItem={this.useItem} />

    this.setState({ itemView: itemView });
    return itemView;
  }
  createItemEquippedView = () => {
    const itemEquippedView = <ItemView
      backpackItem={this.state.equipped}
      setDescription={this.setDescription}
      buttonActive={this.props.buttonActive}
      eq={false}
      description={this.state.itemDescription}
      equippedItem={this.equippedItem}
      unequippedItem={this.unequippedItem}
      useUsableItem={this.useUsableItem}
      useItem={this.useItem} />

    this.setState({ itemEquippedView: itemEquippedView });
    return itemEquippedView;
  }

  render() {

    if (this.state.itemView === null && this.state.itemEquippedView === null) {
      return (
        <Segment inverted>
          <Grid.Row textAlign='left' verticalAlign='top'>
            {this.props.showGold !== false ? <Segment inverted color='pink'>Gold: {this.state.gold}</Segment> : null}
          </Grid.Row>
          {this.props.ViewEquipped === false ?
            <Segment inverted color='yellow'>
              <Dimmer active><Loader content='Loading' /> </Dimmer>
            </Segment>
            :
            <Segment inverted color='pink'>
              <Label color='grey' ribbon>Equipped</Label>
              <Dimmer active><Loader content='Loading' /> </Dimmer>
              <Label color='grey' ribbon>Backpack</Label>
              <Dimmer active><Loader content='Loading' /> </Dimmer>
            </Segment>
          }
        </Segment>
      );
    }

    return (
      <Segment inverted>
        <Grid.Row textAlign='left' verticalAlign='top'>
          {this.props.showGold !== false ? <Segment inverted color='pink'>Gold: {this.state.gold}</Segment> : null}
        </Grid.Row>

        {this.props.ViewEquipped === false ?
          <Segment inverted color='yellow'>
            {this.state.itemView}
            {/* <ItemView
            backpackItem={this.state.backpackItem} 
            setDescription={this.setDescription} 
            buttonActive={this.props.buttonActive}
            eq={true}
            description={this.state.itemDescription}
            equippedItem={this.equippedItem}
            unequippedItem={this.unequippedItem} 
            useItem={this.useItem} /> */}
          </Segment>
          :
          <Segment inverted color='pink'>

            <Label color='grey' ribbon>Equipped</Label>
            {this.state.itemEquippedView}
            {/* <ItemView 
              itemDescription={this.state.itemDescription} 
              setDescription={this.setDescription} 
              backpackItem={this.state.equipped} 
              eq={false} 
              description={this.state.itemDescription} 
              equippedItem={this.equippedItem}
              unequippedItem={this.unequippedItem}
              useItem={this.useItem}
              /> */}
            <Label color='grey' ribbon>Backpack</Label>
            {this.state.itemView}
            {/* <ItemView
              backpackItem={this.state.backpackItem} 
              setDescription={this.setDescription} 
              buttonActive={this.props.buttonActive}
              description={this.state.itemDescription}
              eq={true} 
              equippedItem={this.equippedItem}
              unequippedItem={this.unequippedItem}
              useItem={this.useItem}
              />  */}
          </Segment>
        }
      </Segment>
    );
  }
}

export default InventoryView;