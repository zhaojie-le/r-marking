import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import EnterRoute from './App';
import './index.scss';

ReactDOM.render(
    <EnterRoute />,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
