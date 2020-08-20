import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Header, Segment } from 'semantic-ui-react';
import ViewImage from './ViewImage';


class Screenshots extends React.Component {
    constructor(props) {
        super(props);

        this.state = { active: false };
    }

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    render() {
        return (
            <Segment color='green' inverted>
                <Segment inverted>
                    <Header as='h1' textAlign='center'>Gallery</Header>
                    {/* Questbook / Tasks / Shop / Guild / Profile */}
                    <Carousel autoPlay interval={6000} swipeable stopOnHover infiniteLoop showStatus={false} showThumbs={false} transitionTime={600}>
                        <ViewImage src={'https://i.imgur.com/owMelG2.png'} title={'Questbook'} />
                        <ViewImage src={'https://i.imgur.com/cHgoSS7.png'} title={'Tasks'} />
                        <ViewImage src={'https://i.imgur.com/cHgoSS7.png'} title={'Shop'} />
                        <ViewImage src={'https://i.imgur.com/cHgoSS7.png'} title={'Tasks'} />
                        <ViewImage src={'https://i.imgur.com/cHgoSS7.png'} title={'Guild'} />
                        <ViewImage src={'https://i.imgur.com/cHgoSS7.png'} title={'Profile'} />
                    </Carousel>
                </Segment>

            </Segment>
        );
    }
}

export default Screenshots;