import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import LoginButton from './components/LoginButton';
import imgLeft from './components/images/MANTODO.PNG'
import imgRight from './components/images/FEMALTODO.PNG'
import logoMid from './components/images/LogoMid.jpg'
import Midimg from './components/images/overview.svg'

class Login extends React.Component {
  render() {
    return (
      <>
        <div className="loginImges">

          <div className="homeimgLeft">
            <img alt="homeimgLeft" src={imgLeft}></img>
          </div>
          <div className="logoMid">
            <img alt="logoMid" src={logoMid}></img>
          </div>
          <div className="homeimgRight">
            <img alt="homeimgRight" src={imgRight}></img>
          </div>
          <p>To Do gives you focus, from work to play.</p>
        </div>
        <div className="loginbtn">
          <LoginButton />
        </div>
        <div className="domain">
          
          <h3> 🕑 ‌Time, Manege It With Our App</h3>
          <br /><br />
          <h5>‌To-do lists are a great managing tool because you can use them to clarify your goals with the exact time so you can handle and control your day event and task<br /><br />
            When you write all your tasks in a list ,it helps you stay focused. While freeing up space in your mind for other more creative tasks..
          </h5>
          <div className="midimg">
            <img src={Midimg }alt="Midimg"/>
          </div>
          </div>


      </>
    )
  }
}

export default Login;
