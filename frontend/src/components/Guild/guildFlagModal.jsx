import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Image } from 'semantic-ui-react';
import "./style-avatarModal.css";

class FlagModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      img: '',
    }
  }

  setImage = (e) => {
    this.setState({
      img: e.currentTarget.value
    })
  }

  componentDidMount() {
    this.setState({
      img: this.props.img
    })
  }

  componentDidUpdate(prevProps) {
    this.props.handleClose(this.state.img);
  }

  render() {
    return (
      <div className="modalAvatar">
        <div className="modalAvatarHeader">
          <h3>Change avatar</h3>
        </div>
        <div className="modalAvatarImage">
          <Image id='avatar' src={this.state.img} size='medium' rounded />
        </div>
        <div id='modalButtons'>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/treasure_chest_shield.png">
            Treasure
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/shopping_cart_shield.png">
            Shopping
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/ligthbulb_on_shield.png">
            Ligthbulb
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/trophy_shield.png">
            Trophy
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/webcam_shield.png">
            Webcam
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/weight_shield.png">
            Weight
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/trojan_shield.png">
            Trojan
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/radio_microphone_shield.png">
            Microphone
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/games_control_shield.png">
            Games
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/physics_magnet_shield.png">
            Magnet
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/companies_shield.png">
            Companies
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/hammer_shield.png">
            Hammer
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/binoculars_shield.png">
            Binoculars
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/plastic_bottle_shield.png">
            Bottle
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/smiley_shield.png">
            Slimey
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/world_shield.png">
            World
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/hamburguer_shield.png">
            Chamburger
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/bomb_shield.png">
            Bomb
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/camera_shield.png">
            Camera
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/brushes_shield.png">
            Brushes
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/calendar_shield.png">
            Callendar
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/film_reel_shield.png">
            Film
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/pen_drive_shield.png">
            Pendrive
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/teachers_day_shield.png">
            Apple
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/technical_wrench_shield.png">
            Wrench
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/piggy_bank_shield.png">
            Piggy
                    </Button>
          <Button basic color='yellow' onClick={this.setImage} value="https://findicons.com/files/icons/2799/flat_icons/128/briefcase_shield.png">
            Briefcase
                    </Button>
        </div>
      </div>
    );
  }
}

export default FlagModal;


