import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Image } from 'semantic-ui-react';
import "./style-avatarModal.css";

class AvatarModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            img: '',
        }
        console.log(this.props.img);
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
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/Villager-icon.png">
                        Villager
                    </Button>
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/Elf-icon.png">
                        Elf
                    </Button>
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/Viking-icon.png">
                        Viking
                    </Button>
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/King-icon.png">
                        King
                    </Button>
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/Knight-icon.png">
                        Knight
                    </Button>
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/Fairy-icon.png">
                        Fairy
                    </Button>
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/Sorceress-Witch-icon.png">
                        Witch
                    </Button>
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/Centaur-icon.png">
                        Centaur
                    </Button>
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/Medusa-icon.png">
                        Medusa
                    </Button>
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/Orc-icon.png">
                        Orc
                    </Button>
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/Grim-Reaper-icon.png">
                        Reaper
                    </Button>
                </div>
            </div>
        );
    }
}

export default AvatarModal;


