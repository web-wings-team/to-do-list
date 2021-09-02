import React, { Component } from 'react';
import './AboutUs.css';
class AboutUs extends Component {
  render() {
    return (
      <>
        <div id="container">
          <div className="cards">
            <div className="content">
              <h2> Malik Swayyed </h2>
              <p>Mechanical engineer has start a new path in programming, it was a hoppy but not any more :)</p>
            </div>
            <img src="https://avatars.githubusercontent.com/u/85099893?v=4" alt="Malik Swayyed" />
          </div>
          <div className="cards">
            <div className="content">
              <h2>Abdalrahman Abualata</h2>
              <p>I'm 26 years old ,I'm a civil engineering , I have a little bit knowledge in java and I'm looking forward to learn more.</p>
            </div>
            <img src="https://avatars.githubusercontent.com/u/85103825?v=4" alt="Abdalrahman Abualata" />
          </div>
          <div className="cards">
            <div className="content">
              <h2>Shamikh quraan</h2>
              <p> Hey! im Shamikh Power Engineer, programmer, Designer ,unshakable
                optimist dedicated to be the best version of me ,Collaborative
                at my zone and for sure Helpful.</p>
            </div>
            <img src="https://avatars.githubusercontent.com/u/85109430?v=4" alt="Shamikh quraan" />
          </div>
          <div className="cards">
            <div className="content">
              <h2>Bashar Taamneh</h2>
              <p> I'm 26 years old I obtained a Bachelor’s degree from Al Hussein Bin Talal University in computer engineering.</p>
            </div>
            <img src="https://avatars.githubusercontent.com/u/85108031?v=4" alt="Bashar Taamneh" />
          </div>
          <div className="cards">
            <div className="content">
              <h2>Abdullah Nazzal</h2>
              <p>I'm 25 years old, I'm graduated from the Jadara University, majoressd Software Engineering.</p>
            </div>
            <img src="https://avatars.githubusercontent.com/u/52371286?v=4" alt="Abdullah Nazzal" />
          </div>
       
        </div>
        </>
    );
  }
}
export default AboutUs;
