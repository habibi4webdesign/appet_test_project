import './index.css';
import './css/custom-style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter  } from 'react-router-redux';
import { createBrowserHistory,createHashHistory } from 'history';
import configureStore from './store/configureStore';
import MainContainer from './container/MainContainer';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import './css/fonts/icons/style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import cors from "cors";


//import 'font-awesome/css/font-awesome.css';
// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createHashHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter  history={history}>
      <MuiThemeProvider >
        <MainContainer />
      </MuiThemeProvider>
    </ConnectedRouter > 
  </Provider>,
  rootElement);
