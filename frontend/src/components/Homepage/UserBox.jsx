import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Divider, Grid, Header, Icon, Segment, Responsive, Container } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';

class UserBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name: null };
    }

    getUser = async () => {
        if (!localStorage.getItem('token'))
            return null;

        const user = await fetch('/api/users/me', setHeaders())
            .then(response => response.json())
            .then(user => user.name ? user.name : user.email);

        return user;
    }

    async componentDidMount() {
        this.setState({ name: await this.getUser() });
    }


    render() {
        if (!this.state.name) {
            return (
                <Segment color='green' inverted>
                    <Segment textAlign='center' inverted placeholder>

                        <Responsive maxWidth={992}>
                            <Container>
                                <Icon name='pencil' size='huge' color='green' />
                                <h2 style={{ margin: '10px 20px 10px 20px' }}>Join us now by registering...</h2>
                                <Button as={NavLink} to={'/register'} color='blue'>
                                    Register!
                                </Button>
                            </Container>

                            <Divider horizontal inverted >
                                OR
                            </Divider>

                            <Container>
                                <Icon name='address card' size='huge' color='green' />
                                <h2 style={{ margin: '10px' }}>...let's get to work by logging in</h2>
                                <Button as={NavLink} to={'/login'} color='blue'>
                                    Login!
                                </Button>
                            </Container>
                        
                        </Responsive>

                        <Responsive minWidth={993}>
                            <Grid columns={2} relaxed={'very'} stackable>
                                <Grid.Column>
                                    <Icon name='pencil' size='huge' color='green' />
                                    <h2 style={{ marginTop: '10px' }}>Join us now by registering...</h2>
                                    <Button as={NavLink} to={'/register'} color='blue'>
                                        Register!
                                </Button>
                                </Grid.Column>

                                <Grid.Column>
                                    <Icon name='address card' size='huge' color='green' />
                                    <h2 style={{ marginTop: '10px' }}>...let's get to work by logging in</h2>
                                    <Button as={NavLink} to={'/login'} color='blue'>
                                        Login!
                                </Button>
                                </Grid.Column>
                            </Grid>

                            <Divider vertical inverted>
                                OR
                            </Divider>
                        </Responsive>
                    </Segment>
                </Segment >
            );
        }
        else return (
            <Segment color='green' inverted textAlign='center'>
                <Segment inverted>
                    <Header as='h1'>Welcome back,</Header>
                    <Icon name='user secret' size='huge' color='green' />
                    <Header as='h1'>{this.state.name}!</Header>
                </Segment>

            </Segment>
        );
    }
}

export default UserBox;