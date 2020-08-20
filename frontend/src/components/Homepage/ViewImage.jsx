import React from 'react';
import { Button, Dimmer, Header, Image, Modal } from 'semantic-ui-react';

class ViewImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { active: false };
    }

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    render() {
        const { active } = this.state;
        const content = (
            <div>
                <Header as='h2' inverted>
                    {this.props.title}
                </Header>

                <Modal size='large' trigger={<Button color='green'>Zoom</Button>}>
                    <Modal.Header >{this.props.title}</Modal.Header>
                    <Image src={this.props.src} />
                </Modal>
            </div>
        )
        return (
            <Dimmer.Dimmable
                as={Image}
                dimmed={active}
                dimmer={{ active, content }}
                onMouseEnter={this.handleShow}
                onMouseLeave={this.handleHide}
                src={this.props.src}
                rounded
            />
        );
    }
}

export default ViewImage;