import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';
import Store from '../../Store';

const AppBar = () => {
  const { isLogged, changeStore, me, hasCharacter } = useContext(Store);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    changeStore('isLogged', false);
    changeStore('me', null);
    changeStore('hasCharacter', null)
    window.location.reload();
  };
  return (
    <Menu inverted color='black'>
      <Menu.Item as={Link} to="/" >
        <p style={{ color: 'white', fontWeight: 'bold', fontSize: 'large' }}>
          TaskWars</p>
      </Menu.Item>
      <Menu.Item color='green' as={NavLink} name="Main Page" to="/" activeClassName="active" exact /><br></br>

      {!isLogged && (
        <>
          <Menu.Item color='pink' as={NavLink} name="Login" to="/login" activeClassName="active" /><br></br>
          <Menu.Item color='violet' as={NavLink} name="Register" to="/register" activeClassName="active" /><br></br>
        </>
      )}

      {(isLogged && !hasCharacter) && (
        <>
          <Menu.Menu>
            <Menu.Item color='brown' as={NavLink} name="Create Character" to="/characterCreation" activeClassName="active" />
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item color='olive' as={NavLink} name={me ? me.name : 'user'} to="/profile" activeClassName="active" />
            <Menu.Item color='red' as={Link} name="Log out" to="/" onClick={handleLogout} />
          </Menu.Menu>
        </>
      )}

      {(isLogged && hasCharacter) && (
        <>
          <Menu.Menu>
            <Menu.Item color='blue' as={NavLink} name="Questbook" to="/questbook" activeClassName="active" /><br></br>
            <Menu.Item color='orange' as={NavLink} name="Tasks" to="/tasks" activeClassName="active" /><br></br>
            <Menu.Item color='yellow' as={NavLink} name="Shop" to="/shop" activeClassName="active" /><br></br>
            <Menu.Item color='pink' as={NavLink} name="Inventory" to="/inventory" activeClassName="active" /><br></br>
            <Menu.Item color='brown' as={NavLink} name="Guild" to="/guild" activeClassName="active" /><br></br>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item color='olive' as={NavLink} name={me ? me.name : 'user'} to="/profile" activeClassName="active" />
            <Menu.Item color='red' as={Link} name="Log out" to="/" onClick={handleLogout} />
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};

export default AppBar;
