import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MyTasks from './components/MyTasks';
import { withAuth0 } from '@auth0/auth0-react';

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
              {((isAuthenticated) ? <MyTasks />  : <button>GET START</button>)}
                
              </Route>
              <Route exact path="/my_tasks">
              {((isAuthenticated) ? <MyTasks />  : <p>Your are Not Login</p>)}
              </Route>
            </Switch>
            <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
