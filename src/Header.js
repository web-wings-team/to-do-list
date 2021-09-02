import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButton from './components/LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import { CgProfile } from "react-icons/cg";
import { FaBookReader } from "react-icons/fa";
import Hlogo from "./components/images/Hlogo.jpg"
import { FaHome } from "react-icons/fa";
class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
      <Navbar className="header" collapseOnSelect expand="lg" >
        <Navbar.Brand className="headerBrand" >   
        <img alt="weblogo" src={Hlogo}  width="150"
        height="50"
          className="d-inline-block align-top"
        />  
        </Navbar.Brand>
        <Link to="/my_tasks"> <FaHome /> Home </Link>
        <Link to="/profile"> <CgProfile /> Profile </Link>
        <Link to="/About_Us"> <FaBookReader /> About Us </Link>
      </Navbar>
      
      <Navbar id="nav2" bg="light" expand="lg">
  
    <Navbar.Brand >  {((isAuthenticated) ? <LogoutButton /> : "")}</Navbar.Brand>
</Navbar>
      </>
    );
  }
}
export default withAuth0(Header);