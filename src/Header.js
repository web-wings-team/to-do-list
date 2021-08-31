import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButton from './components/LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import { FaHome, FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaBookReader } from "react-icons/fa";



class Header extends React.Component {

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <Navbar className="header" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="headerBrand" >My Favorite Books</Navbar.Brand>
        <Link to="/Home"> <FaHome /> Home </Link>
        <Link to="/my_tasks"> <FaTasks /> My Tasks </Link>
        <Link to="/profile"> <CgProfile /> Profile </Link>
        <Link to="/About_Us"> <FaBookReader /> About Us </Link>

        {((isAuthenticated) ? <LogoutButton /> : "")}


      </Navbar>
    );
  }
}

export default withAuth0(Header);