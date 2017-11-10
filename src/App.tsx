import * as React from 'react';
import './App.scss';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import List from './containers/List';
import CreateOrderStrategy from './containers/CreateOrderStrategy';
import store from './store';

const NotFound = () => (
  <div>
    333
  </div>
);

const Routes = () => (
    <Provider store={store}>
      <Router>
        <div> 
          <Switch>
            <Route path="/createOrderStrategy" component={CreateOrderStrategy} />
            <Route path="/" component={List} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
);

export default Routes;