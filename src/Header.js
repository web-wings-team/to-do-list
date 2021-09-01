import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import {Container , Nav ,NavDropdown} from 'react-bootstrap/';

import './Header.css';
import LogoutButton from './components/LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import { FaHome, FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaBookReader } from "react-icons/fa";
import { ImExit } from "react-icons/im";




class Header extends React.Component {

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (

      <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand >Event-Calendar</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <Link to="/Home"> <Nav.Link href="/Home"> <FaHome /> Home </Nav.Link></Link>
        <Link to="/profile">  <Nav.Link href="/profile">  <CgProfile /> Profile </Nav.Link></Link>
        <NavDropdown title="More" id="basic-nav-dropdown">
        <Link to="/my_tasks"> <NavDropdown.Item href="/my_tasks"> <FaTasks /> My Tasks </NavDropdown.Item></Link>
        <Link to="/About_Us"> <NavDropdown.Item href="/About_Us"> <FaBookReader /> About Us </NavDropdown.Item></Link>
          <NavDropdown.Item href="/Home"> <ImExit/>LogOut </NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
      // <Navbar className="header" collapseOnSelect expand="lg" bg="dark" variant="dark">
      //   <Navbar.Brand className="headerBrand" >My Favorite Books</Navbar.Brand>
      //   <Link to="/Home"> <FaHome /> Home </Link>
      //   <Link to="/my_tasks"> <FaTasks /> My Tasks </Link>
      //   <Link to="/profile"> <CgProfile /> Profile </Link>
      //   <Link to="/About_Us"> <FaBookReader /> About Us </Link>

      //   {((isAuthenticated) ? <LogoutButton /> : "")}


      // </Navbar>
    );
  }
}

export default withAuth0(Header);