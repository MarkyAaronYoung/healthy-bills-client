import React from 'react';

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import AuthHome from '../components/pages/AuthHome/AuthHome';
import TheNavbar from '../components/pages/Navbar/Navbar';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/authhome', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/landingPage', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const RoutesContainer = ({ authed, authToggle }) => (
  <div>
    <Switch>
      <PrivateRoute path="/authhome" component={AuthHome} authed={authed}/>
      <Redirect from='*' to='/authhome' />
    </Switch>
  </div>
);
class App extends React.Component {
  state = {
    authed: false,
    userData: null,
  };

  componentDidMount() {
    if (localStorage.getItem('authed') === 'true') {
      this.setState({ authed: true });
    }
  }

  authToggle = () => {
    const { authed } = this.state;
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
