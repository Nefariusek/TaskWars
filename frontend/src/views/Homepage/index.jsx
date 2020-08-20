import React from 'react';
import HomepageContent from '../../components/Homepage/HomepageContent';
import UserBox from '../../components/Homepage/UserBox';
import { Container } from 'semantic-ui-react';

const Home = () => {
  
  return (
    <div>
      <HomepageContent />
      <Container style={{padding: '10px 0 10px 0'}}>
        <UserBox />
      </Container>
    </div>
  );
};

export default Home;



