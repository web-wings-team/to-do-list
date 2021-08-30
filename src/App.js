import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MyTasks from './components/Navbar/MyTasks';
import { withAuth0 } from '@auth0/auth0-react';
import Profile from './components/Navbar/Profile';
import AboutUs from './components/Navbar/AboutUs';
import Login from './Login';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import Home from './components/Navbar/Home'
class App extends React.Component {

  render() {
    const {isAuthenticated, } = this.props.auth0;
    console.log('app', this.props);
    return(
      <>
        <Router>
            <Header />
            <Switch>

              <Route exact path="/">
              {((isAuthenticated) ? <MyTasks /> :<Login/> )}
              </Route>

              <Route exact path="/Home">
              <Home/>
              </Route>

              <Route exact path="/profile">
              {((isAuthenticated) ? <Profile/> :<Login/> )}
              </Route>

              <Route exact path="/About_Us">
              <AboutUs/>
              </Route>

              <Route exact path="/my_tasks">
              {((isAuthenticated) ? <MyTasks />  :<Login/>)}
              </Route>

            </Switch>
            <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
