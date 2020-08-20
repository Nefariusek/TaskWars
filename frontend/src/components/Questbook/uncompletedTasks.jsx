import React from 'react';
import { Item, Label } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import StartTask from './startTask';

class UncompletedTasks extends React.Component {

  state = {
    tasks: []
  }



  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    console.log(body.character_id);
    console.log(1);
    this.fetchCharacter(body.character_id);

  }


  fetchCharacter = async (id) => {
    const response = await fetch(`/api/characters/${id}`, setHeaders());
    const body = await response.json();
    console.log(body);
    this.getData(body.questbook_id);


  }


  getData = async (id) => {
    const response = await fetch(`/api/questbook/${id}/uncompleted`, setHeaders());
    const body = await response.json();
    console.log(body);
    this.setState(
      {
        tasks: body
      }
    )
  }


  componentDidMount() {
    this.fetchUser()
    console.log('mounted')
  }

  componentDidUpdate() {

  }


  render() {
    return (
      <Item.Group divided>
        {this.state.tasks.map(x => (

          <Item key={x._id} >
            <Item.Image src='https://icons-for-free.com/iconfiles/png/128/description+note+problem+task+tasks+icon-1320168114384620466.png' />

            <Item.Content>
              <Item.Header as='a'>{x.name}</Item.Header>
              <Item.Meta>
                <span className='type'>{x.type}</span>
              </Item.Meta>
              <Item.Description>{x.description}</Item.Description>
              <Item.Description>Duration: {x.duration}</Item.Description>
              <Item.Description>Penalty: {x.penalty}</Item.Description>
              <Item.Extra>
                <StartTask task={x} />
                <Label color='brown'>{x.category}</Label>
                <Label color='yellow'>Gold: {x.gold}</Label>
                <Label color='teal'>Exp: {x.exp}</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  }
}

export default UncompletedTasks;    
