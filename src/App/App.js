import React from 'react';

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Home from '../components/pages/Home/Home';
import Dashboard from '../components/pages/LandingPage/Dashboard';
import TheNavbar from '../components/pages/Navbar/Navbar';
import Register from '../components/pages/Register/Register';
import Bills from '../components/pages/Bills/Bills';

import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  console.log(authed);
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} {...rest} />)
    : (<Home {...props} {...rest} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const RoutesContainer = ({ authed, authToggle }) => (
  <div>
    <Switch>
      <PrivateRoute path="/dashboard" component={Dashboard} authed={authed}/>
      <PrivateRoute path="/home" component={Home} authed={authed} authToggle={authToggle}/>
      <PrivateRoute path="/bills" component={Bills} authed={authed}/>
      <PublicRoute path="/register" component={Register} authed={authed} authToggle={authToggle}/>
      <Redirect from='*' to='/home' />
    </Switch>
  </div>
);
class App extends React.Component {
  state = {
    authed: false,
    userData: null,
  };

  componentDidMount() {
    if (localStorage.getItem('authed') === 'true' && this.state.authed === false) {
      this.setState({ authed: true });
    }
  }

  authToggle = () => {
    const { authed } = this.state;
    console.log('authed', authed);
    this.setState({ authed: !authed });
  }

  render() {
    const { authed } = this.state;

    return (
      <div>
        <BrowserRouter>
          <TheNavbar authed={authed} authToggle={this.authToggle}/>
          <RoutesContainer authed={authed} authToggle={this.authToggle}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
