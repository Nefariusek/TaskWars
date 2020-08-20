import React from 'react';
import { Container, Grid, Responsive } from 'semantic-ui-react';
import Quote from './Quote';
import Screenshots from './Screenshots';
import Stats from './Stats';

class HomepageContent extends React.Component {

    render() {

        return (
            <Container>
                <Quote />
                <Responsive minWidth={993} >
                    <Grid columns='16'>
                        <Grid.Row stretched>
                            <Grid.Column width='4' floated='left'>
                                <Stats />
                            </Grid.Column>
                            <Grid.Column width='12' floated='right' >
                                <Screenshots />
                            </Grid.Column>


                        </Grid.Row>

                    </Grid>
                </Responsive>

                <Responsive maxWidth={992}>
                    <Stats />
                    <Screenshots />
                </Responsive>
            </Container>
        );
    }
}

export default HomepageContent;