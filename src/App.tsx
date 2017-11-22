import * as React from 'react';
import './App.scss';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import CreateOrderStrategy from './containers/CreateOrderStrategy';
import List from './containers/List';
import store from './store';

const NotFound = () => (
    <div>
        the page has been eated by xuping
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