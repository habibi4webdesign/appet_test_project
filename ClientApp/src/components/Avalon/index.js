import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from './App';
import { HashRouter } from 'react-router-dom'
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <HashRouter>
        <App></App>
    </HashRouter>,
    document.getElementById('root')
);

//registerServiceWorker();
