import axios from 'axios';
import React from 'react';
import { Button, Grid, Icon, Segment } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';



class FinishTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ''
    }

  }
  setStatus = async () => {
    return this.props.time.timeToEnd >= 0 ? this.setState({ status: 'completed' }) : this.setState({ status: 'failed' });
  }

  putData = async (task_id, questbook_id) => {
    await axios({
      url: `/api/questbook/${questbook_id}/task/${task_id}`,
      method: 'put',
      headers: setHeaders(),
      data: { status: this.state.status }
    }).then((response) => {
      // console.log(response);
    })
  }

  putGold = async (inventory_id, gold) => {
    await axios({
      url: `/api/inventory/${inventory_id}/gold`,
      method: 'put',
      headers: setHeaders(),
      data: { inventory: { gold: gold } }
    }).then((response) => {
      // console.log(response);
    })
  }

  putExp = async (character_id, exp_points) => {
    await axios({
      url: `/api/characters/${character_id}/exp_points`,
      method: 'put',
      headers: setHeaders(),
      data: { exp_points: exp_points }
    }).then((response) => {
      // console.log(response);
    })
  }

  putHealth = async (character_id, health) => {
    await axios({
      url: `/api/characters/${character_id}/health`,
      method: 'put',
      headers: setHeaders(),
      data: { health: health }
    }).then((response) => {
      // console.log(response);
    })
  }

  taskCompleted = async (inventory_id, character_id, character) => {
    const response = await fetch(`/api/inventory/${inventory_id}`, setHeaders());
    const inventory = await response.json();
    const gold = inventory.gold + this.props.task.gold
    const exp_points = character.exp_points + this.props.task.exp
    await this.putGold(inventory_id, gold)
    await this.putExp(character_id, exp_points)
  }

  taskFailed = async (character_id, character) => {
    const health = character.health - this.props.task.penalty
    // console.log(health);
    await this.putHealth(character_id, health);
  }

  //   guildFightFailed = async (character_id, character) => {
  //     const health = character.health - this.props.task.penalty
  //     // console.log(health);
  //     await this.putHealth(character_id, health)
  // }

  finishTask = async () => {
    const user = await fetch('/api/users/me', setHeaders());
    const body = await user.json();
    const response = await fetch(`/api/characters/${body.character_id}`, setHeaders());
    const character = await response.json();
    await this.putData(this.props.task._id, character.questbook_id);
    if (this.state.status === 'completed') {
      // if(this.state.status === 'failed'){
      this.taskCompleted(character.inventory_id, body.character_id, character);
      if (this.props.task.category === 'Encounters') {
        const guild = await this.checkGuild(character, this.props.task._id);
        console.log(guild);
        if (guild !== undefined) {
          let hp = guild.current_fight.health;
          console.log(hp);
          let dmg = 0;
          if (guild.type === 'Physical') {
            dmg = character.physical_power;
          } else if (guild.type === 'Mental') {
            dmg = character.magical_power;
          } else if (guild.type === 'Utility') {
            dmg = character.physical_power >= character.magical_power ? character.physical_power : character.magical_power;
          }
          hp = hp - dmg;
          console.log(hp);
          guild.current_fight.health = hp;
          const data = {
            name: guild.name,
            current_fight: guild.current_fight
          }
          const params = { ...setHeaders(), body: JSON.stringify(data), method: "PUT" };
          const response = await fetch(`/api/guilds/${guild._id}/current_fight`, params);
          console.log(response);
          if (hp <= 0) {
            const expReward = guild.current_fight.exp / guild.members.length;
            const goldReward = guild.current_fight.gold / guild.members.length;
            console.log(guild);
            guild.members.map(async (memberID) => {
              const memberResponse = await fetch(`/api/characters/${memberID}`, setHeaders());
              const member = await memberResponse.json();
              const memberInventoryResponse = await fetch(`/api/inventory/${member.inventory_id}`, setHeaders());
              const memberInventory = await memberInventoryResponse.json();
              const memberExp = await member.exp_points;
              const memberGold = await memberInventory.gold;
              const dataExp = {
                exp_points: (memberExp + expReward)
              };
              let paramsExp = { ...setHeaders(), body: JSON.stringify(dataExp), method: "PUT" };
              console.log(dataExp);
              await fetch(`/api/characters/${memberID}/exp_points`, paramsExp);
              const dataGold = {
                inventory: { gold: (memberGold + goldReward) }
              };
              let paramsGold = { ...setHeaders(), body: JSON.stringify(dataGold), method: "PUT" };
              console.log(dataGold)
              await fetch(`/api/inventory/${member.inventory_id}/gold`, paramsGold);

              guild.current_fight.task_to_dmg.map(async (taskID) => {
                await this.putData(taskID, member.questbook_id);
              });
            });
            const dataFinish = {
              name: guild.name,
              current_fight: {}           //current_fight after fight
            }
            let paramsFinish = { ...setHeaders(), body: JSON.stringify(dataFinish), method: "PUT" };
            await fetch(`/api/guilds/${guild._id}/current_fight`, paramsFinish);
          }
        }
      }
    }
    else if (this.state.status === 'failed') {
      // } else if (this.state.status === 'completed'){

      this.taskFailed(body.character_id, character);
      if (this.props.task.category === 'Encounters') {
        const guild = await this.checkGuild(character, this.props.task._id);
        if (guild !== undefined) {

          let fight = guild.current_fight;
          console.log(fight);
          fight.duration = -2147483647;
          const data = {
            name: guild.name,
            current_fight: fight
          }
          let params = { ...setHeaders(), body: JSON.stringify(data), method: "PUT" };
          await fetch(`/api/guilds/${guild._id}/current_fight`, params);

          guild.members.map(async (memberID) => {
            const memberResponse = await fetch(`/api/characters/${memberID}`, setHeaders());
            const member = await memberResponse.json();
            guild.current_fight.task_to_dmg.map(async (taskID) => {
              await this.putData(taskID, member.questbook_id);
            });
          });
          const dataFinish = {
            name: guild.name,
            current_fight: {}           //current_fight aafter fight
          }
          let paramsFinish = { ...setHeaders(), body: JSON.stringify(dataFinish), method: "PUT" };
          await fetch(`/api/guilds/${guild._id}/current_fight`, paramsFinish);
        }
      }
    }
  }

  checkGuild = async (character, task_id) => {
    return new Promise((res, rej) => {
      character.guilds.map(async (guild_id) => {
        const guildResponse = await fetch(`/api/guilds/${guild_id}`, setHeaders());
        const guild = await guildResponse.json();
        console.log(guild);
        guild.current_fight.task_to_dmg.forEach((id) => {
          if (id === task_id) {
            res(guild);
          }
        })
      })
    })
  }

  onButtonSubmit = async e => {
    e.preventDefault();
    console.log(this.state.status);
    await this.setStatus();
    console.log(this.state.status);
    await this.finishTask();
    console.log('message');
    this.props.taskStateChanged(this.state.status);
  }

  onButtonSubmitCompletedTask = async e => {
    e.preventDefault();
    await this.setState({ status: 'completed' });
    await this.finishTask();
    this.props.taskStateChanged(this.state.status);
  }
  onButtonSubmitFailedTask = async e => {
    e.preventDefault();
    await this.setState({ status: 'failed' });
    await this.finishTask();
    this.props.taskStateChanged(this.state.status);
  }

  render() {

    return (
      this.props.time.timeToEnd > 0 ?
        <div>
          <Button fluid icon color="blue" onClick={this.onButtonSubmit}>
            Finish task
          <Icon name="check circle" />
          </Button>
        </div> :
        <div>
          <Segment inverted textAlign='center' color='grey'>
            Did you finished this task?
        </Segment>
          <Grid columns={2}>
            <Grid.Column>
              <Button fluid color="green" onClick={this.onButtonSubmitCompletedTask}>
                Yes!
          <Icon name="check circle" />
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid color="red" onClick={this.onButtonSubmitFailedTask}>
                No
          <Icon name="check circle" />
              </Button>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default FinishTask;






