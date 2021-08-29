import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return(
      <Navbar className="footer" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="footerBrand">&copy; Best Books</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
