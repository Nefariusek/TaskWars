import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Tasks from '../../views/Tasks';
import AddTask from './addTask';
import AllTasks from './defaultTasks';
import MenuQuestbook from './menuQuestbook';

const QuestbookContent = () => {
  return (


    <BrowserRouter>

      <Container text>
        <MenuQuestbook />
        <Route exact path="/questbook" render={(props) => <AllTasks {...props} type={'all'} />} />
        <Route exact path="/questbook/completed" render={(props) => <AllTasks {...props} type={'completed'} />} />
        <Route exact path="/questbook/uncompleted" render={(props) => <AllTasks {...props} type={'uncompleted'} />} />
        <Route exact path="/questbook/failed" render={(props) => <AllTasks {...props} type={'failed'} />} />
        <Route exact path="/questbook/addtask" component={AddTask} />
      </Container>
      <Container style={{ marginTop: '20px' }}>
        <Route exact path="/questbook/addCustomTask" component={Tasks} />
      </Container>
    </BrowserRouter>


  );
};

export default QuestbookContent;
