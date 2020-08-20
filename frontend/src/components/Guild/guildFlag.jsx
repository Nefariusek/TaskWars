import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Modal, Segment } from 'semantic-ui-react';
import GuildFlagModal from './guildFlagModal';

class Flag extends React.Component {
  constructor(props) {
    super(props);

    this.avatarHoverRef = React.createRef();
    this.state = {
      avatar: this.props.avatar,
      id: this.props.id,
      img: '',
    }
  }

  componentDidMount() {
    this.avatarHoverRef.current.style.opacity = "0%"
    this.avatarHoverRef.current.addEventListener("mouseover", this.onMouseOverAvatar);
    this.avatarHoverRef.current.addEventListener("mouseleave", this.onMouseLeaveAvatar);
  }

  componentDidUpdate(prevProps) {
    if (this.props.avatar !== prevProps.avatar) {
      this.setState({
        avatar: this.props.avatar,
        id: this.props.id
      })
    }
  }

  onMouseOverAvatar = () => {
    this.avatarHoverRef.current.style.opacity = "70%";
  }

  onMouseLeaveAvatar = () => {
    this.avatarHoverRef.current.style.opacity = "0%";
  }

  handleClose = (img) => {
    this.img = img;
  }

  onModalClose = () => {
    this.setState({ avatar: this.img, img: this.props.avatar });
    this.props.handleClose(this.state.avatar);
  }

  render() {
    return (
      <Segment compact inverted textAlign='center'>
        <div className="avatarWrap">
          <Modal
            trigger={
              <div id='avatarHover' ref={this.avatarHoverRef}>
                <h1>Change avatar</h1>
              </div>
            }
            onClose={this.onModalClose}
          >
            <GuildFlagModal img={this.state.avatar} handleClose={this.handleClose} />
          </Modal>
          <div className='avatarDiv'>
            <Image id='avatar' src={this.state.avatar} size='tiny' rounded />
          </div>
        </div>
      </Segment>
    );
  }
}

export default Flag