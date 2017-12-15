import * as React from 'react';
import './App.scss';
import {
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { CreateOrderStrategy, List, DetailOrderStrategy, CreateImportUserStrategy, CreateAllUserStrategy } from './containers';

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
                    <Route path="/detailOrderStrategy/:id" component={DetailOrderStrategy} />
                    <Route path="/detailOrderStrategy/:id/#edit" component={DetailOrderStrategy} />
                    <Route path="/createImportUserStrategy/:id" component={CreateImportUserStrategy} />
                    <Route path="/createAllUserStrategy/:id" component={CreateAllUserStrategy} />
                    <Route path="/" component={List} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default Routes;