import * as React from 'react';
import './App.scss';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import List from './containers/List';
import store from './store';

const UserSubLayout = props => (
  <div className="user-sub-layout">
    <div className="primary-content">
      XXXXXXXX
    </div>
  </div>
);

const NotFound = () => (
  <div>
    333
  </div>
);

const Routes = () => (
    <Provider store={store}>
      <Router>
        <div> 
          <List />
          <Switch>
            <Route path="/users" component={UserSubLayout} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
);

export default Routes;