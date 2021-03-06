import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css'
import Hlogo from "./components/images/Hlogo.jpg"
import { FaLocationArrow ,FaPhoneAlt,FaMailBulk,FaFacebookSquare, FaGithub, FaLinkedin, FaInstagram} from "react-icons/fa";
class Footer extends React.Component {
  render() {
    return (
      <Navbar className="footer" collapseOnSelect >
        <img alt="weblogo" src={Hlogo} width="180"
          height="70"
          className="d-inline-block align-top"
        />
        <div className="vision">
          <h5>staying organized is Key </h5>
          <p>When you write all your tasks in a list ,it helps you stay focused. While freeing up space in your mind for other more creative tasks..</p>
          <h5>Be productive</h5>
          <p> to do list allows you to prioritize the tasks that are more important</p>
        </div>
        <div className="contact">
          <h6>Contact Us</h6>
          <p> <FaLocationArrow />  Suliman Al Nabulsi St 43-35, Amman, Jordan </p> <br/>
          <p> <FaPhoneAlt />   (+962) 7888 887 731</p> <br/>
          <p> <FaMailBulk />  WebWings@gmail.com</p> <br/>
        </div>
        <div className="icons">
          <FaFacebookSquare/>
          <FaGithub/>
          <FaLinkedin/>
          <FaInstagram/>
        </div>
        <hr />
        <Navbar.Brand className="footerBrand">2021 &copy; All Rights Reserved Web Wings</Navbar.Brand>
      </Navbar>
    );
  }
}
export default Footer;