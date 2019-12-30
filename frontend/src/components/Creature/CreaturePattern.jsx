import React from 'react';
import { Item, Segment, Icon, Button, Step, Header, Image } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';

class CreaturePattern extends React.Component {
  state = {};

  handleButtonAddClick = async e => {};

  render() {
    return (
      <Segment.Group horizontal>
        <Segment style={{width: '35%'}}>
          <Image src={this.props.creature.picture} />
        </Segment>
        <Segment>
          <Item>
            <Item.Image style={{ display: 'inline-block' }}>
              <Icon name="bug" />
            </Item.Image>

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
                  nazwa questa/description questa
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
                  <Step.Description>{this.props.creature.duration}</Step.Description>
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
                  <Step.Description>{this.props.creature.physcical_resistance}</Step.Description>
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
    );
  }
}

export default CreaturePattern;
