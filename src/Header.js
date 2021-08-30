import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButton from './components/LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <Navbar className="header" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="headerBrand" >My Favorite Books</Navbar.Brand>
        <Link to="/Home">Home</Link>
        <Link to="/my_tasks">My Tasks</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/About_Us">About Us</Link>

        {((isAuthenticated) ? <LogoutButton/> :<p>Your are Not Login</p> )}


      </Navbar>
    );
  }
}

export default withAuth0(Header);