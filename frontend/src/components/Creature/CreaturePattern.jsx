import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Header, Icon, Image, Item, Segment, Step } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import TopPortal from '../Utils/TopPortal';
const _ = require('lodash');

class CreaturePattern extends React.Component {
  state = {
    creatureQuestId: '',
    description: '',
    open: false,
    fightChoosen: false,
  };
  static contextType = Store;
  portalRef = React.createRef();

  addCreatureToFight = async (creature, guild_id, guild_name, task_id) => {
    let task_to_dmg = await this.addTaskToMemebers(task_id, guild_id);
    console.log(task_to_dmg);
    creature.task_to_dmg = task_to_dmg;

    const data = {
      name: guild_name,
      current_fight: creature,
    };
    const params = { ...setHeaders(), body: JSON.stringify(data), method: 'PUT' };
    const response = await fetch(`/api/guilds/${guild_id}/current_fight`, params)
      .then(resp => resp.json());
    if (response.status === 200) this.portalRef.current.handleOpen();
    await new Promise(res => setTimeout(res, 3500));
    this.setState({ open: false, fightChosen: true });
  };

  addTaskToMemebers = async (task_id, guild_id) => {
    const guildResponse = await fetch(`/api/guilds/${guild_id}`, setHeaders());
    const guild = await guildResponse.json();

    const taskResponse = await fetch(`/api/tasks/${task_id}`, setHeaders());
    const task = await taskResponse.json();

    let data = _.omit(task, ['_id', '__v', '__proto']);

    let params = { ...setHeaders(), body: JSON.stringify(data), method: 'PUT' };

    const task_to_dmg = [];
    const requests = guild.members.map(async member_id => {
      const memberResponse = await fetch(`/api/characters/${member_id}`, setHeaders());
      const member = await memberResponse.json();

      const memberTasksResponse = await fetch(`/api/questbook/${member.questbook_id}/task`, params);
      const memberTasks = await memberTasksResponse.json();

      return memberTasks.tasks[memberTasks.tasks.length - 1]._id;
      //task_to_dmg.push(memberTasks.tasks[memberTasks.tasks.length-1]._id);
    });

    return Promise.all(requests)
      .then(id => {
        task_to_dmg.push(...id);
      })
      .then(() => {
        return task_to_dmg;
      });
  };

  getQuestDescription = async () => {
    let response = await fetch(`/api/tasks/${this.props.creature.creature_task}`, setHeaders());
    let body = await response.json();
    this.setState({
      description: body.name,
    });
  };

  creatureQuest = async () => {
    this.setState({ creatureQuestId: this.props.creature.creature_task });
  };

  getGuildName = async id => {
    let response = await fetch(`/api/guilds/${this.context.guild_id}`, setHeaders());
    let body = await response.json();
    this.setState({
      guild_name: body.name,
    });
  };

  handleFightButtonClick = async event => {
    const creatureData = {
      name: this.props.creature.name,
      level: this.props.creature.level,
      health: this.props.creature.health,
      physical_power: this.props.creature.physical_power,
      physical_resistance: this.props.creature.physical_resistance,
      magical_power: this.props.creature.magical_power,
      magical_resistance: this.props.creature.magical_resistance,
      exp: this.props.creature.exp,
      gold: this.props.creature.gold,
      duration: this.props.creature.duration,
      creature_task: this.props.creature.creature_task,
      task_to_dmg: [],
      picture: this.props.creature.picture,
    };
    const guild_id = this.context.guild_id;
    await this.getGuildName();
    const guild_name = this.state.guild_name;
    await this.creatureQuest();
    const task_id = this.state.creatureQuestId;
    await this.addCreatureToFight(creatureData, guild_id, guild_name, task_id);
  };

  convertToDaysAndHours(t) {
    const cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000;
    let time = t * 3600000,
      d = Math.floor(time / cd),
      h = Math.floor((time - d * cd) / ch);
    if (h === 24) {
      d++;
      h = 0;
    }
    return `${d} days ${h} hours`;
  }

  componentDidMount = async () => {
    await this.creatureQuest();
    await this.getQuestDescription();
  };

  render() {
    if (this.state.fightChosen === true) return <Redirect to="/guild" />;
    return (
      <div>
        <Segment.Group horizontal>
          <Segment style={{ width: '35%' }} color="black" inverted>
            <Image src={this.props.creature.picture} />
          </Segment>
          <Segment color="black" inverted>
            <Item>
              <Item.Header
                style={{ display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }}
                as={'h1'}
              >
                {this.props.creature.name}
              </Item.Header>
              <Item.Header
                style={{ display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }}
                as={'h1'}
              >
                level {this.props.creature.level}
              </Item.Header>
              <Item.Description>
                <Segment.Group>
                  <Segment inverted textAlign="center" color="purple" style={{ padding: '2px 0px 0px 6px' }}>
                    <Header as="h5">How to fight</Header>
                  </Segment>
                  <Segment>
                    Complete following quest to deal damage:
                    <br />
                    {this.state.description}
                  </Segment>
                </Segment.Group>
              </Item.Description>

              <Step.Group widths={4} size="tiny">
                <Step style={{ padding: '2px' }}>
                  <Icon name="dot circle" color="yellow" />
                  <Step.Content>
                    <Step.Title>Gold</Step.Title>
                    <Step.Description>{this.props.creature.gold}</Step.Description>
                  </Step.Content>
                </Step>
                <Step style={{ padding: '2px' }}>
                  <Icon name="star" color="violet" />
                  <Step.Content>
                    <Step.Title>Experience</Step.Title>
                    <Step.Description>{this.props.creature.exp}</Step.Description>
                  </Step.Content>
                </Step>
                <Step style={{ padding: '2px' }}>
                  <Icon name="clock" color="teal" />
                  <Step.Content>
                    <Step.Title>Duration</Step.Title>
                    <Step.Description>{this.convertToDaysAndHours(this.props.creature.duration)}</Step.Description>
                  </Step.Content>
                </Step>
                <Step style={{ padding: '2px' }}>
                  <Icon name="heart" color="red" />
                  <Step.Content>
                    <Step.Title>Health</Step.Title>
                    <Step.Description>{this.props.creature.health}</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>

              <Step.Group widths={4} size="tiny">
                <Step style={{ padding: '2px' }}>
                  <Icon name="hand rock" color="red" />
                  <Step.Content>
                    <Step.Title>Physical Power</Step.Title>
                    <Step.Description>{this.props.creature.physical_power}</Step.Description>
                  </Step.Content>
                </Step>
                <Step style={{ padding: '2px' }}>
                  <Icon name="shield alternate" color="red" />
                  <Step.Content>
                    <Step.Title>Physical Resist</Step.Title>
                    <Step.Description>{this.props.creature.physical_resistance}</Step.Description>
                  </Step.Content>
                </Step>
                <Step style={{ padding: '2px' }}>
                  <Icon name="bolt" color="blue" />
                  <Step.Content>
                    <Step.Title>Magical Power</Step.Title>
                    <Step.Description>{this.props.creature.magical_power}</Step.Description>
                  </Step.Content>
                </Step>
                <Step style={{ padding: '2px' }}>
                  <Icon name="shield alternate" color="blue" />
                  <Step.Content>
                    <Step.Title>Magical Resist</Step.Title>
                    <Step.Description>{this.props.creature.magical_resistance}</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
              <Item.Extra>
                <Button fluid icon color="red" labelPosition="right" onClick={this.handleFightButtonClick}>
                  <Icon name="gavel" />
                  Fight
                </Button>
              </Item.Extra>
            </Item>
          </Segment>
        </Segment.Group>
        <TopPortal ref={this.portalRef} header={'Success!'} description={`Creature has been added to the fight!`} />
      </div>
    );
  }
}

export default CreaturePattern;
