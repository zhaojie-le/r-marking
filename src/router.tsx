import * as React from 'react';
import './App.scss';
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function Hello() {
  return (
    <div>
      ssss
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Hello />
    </div>
  );
}

const Home = () => (
    <div>
        <Hello />
        1111
    </div>
);

const About = () => (
  <div>
    222
    <Hello />
  </div>
);

const NotFound = () => (
  <div>
    <Hello />
    333
  </div>
);

const UserComments = ({ match }) => (
  <div>UserId: {match.params.userId}</div>
);

const UserSettings = ({ match }) => (
  <div>UserId: {match.params.userId}<Hello /></div>
);

const UserProfilePage = ({ match }) => (
  <div>
    <Link to={`${match.url}/settings`} >33333</Link>
    User Profile:
    <Route path={`${match.path}/comments`} component={UserComments} />
    <Route path={`${match.path}/settings`} component={UserSettings} />
  </div>
);

const UserSubLayout = props => (
  <div className="user-sub-layout">
    <aside>
      <About />
      <Link to={`${props.match.url}/22222`} >33333</Link>
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={props.match.path} exact={true} component={About} />
        <Route path={`${props.match.path}/:userId`} component={UserProfilePage} />
      </Switch>
    </div>
  </div>
);

const ProductSubLayout = props => (
  <div className="user-sub-layout">
    <aside>
      <About />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={props.match.path} exact={true} component={About} />
        <Route path={`${props.match.path}/:userId`} component={About} />
      </Switch>
    </div>
  </div>
);

const Routes = () => (
    <Provider store={store}>
      <Router>
        <div>
          <App />
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/users" component={UserSubLayout} />
            <Route path="/products" component={ProductSubLayout} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
);

export default Routes;