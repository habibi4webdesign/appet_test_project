import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from '../components/Layout';
import Home from '../container/Home/Home';
import { Route } from 'react-router';
import LoginContainer from './LoginContainer';
import { withRouter, Redirect, Switch } from 'react-router-dom';
import { actionCreators } from '../store/Login'

import { ProgressSpinner } from 'primereact/components/progressspinner/ProgressSpinner';


class MainContainer extends Component {

    componentWillMount() {
        this.props.requestInitialize();

    }

    render() {
        let routes="";
        if ( !this.props.login.isAuthenticated ) {
         routes = (
          <Switch>
            <Route path="/login" exact component={LoginContainer} />
            <Redirect to="/login" />
          </Switch>
        );
      }
    
        if ( this.props.login.isAuthenticated ) {
          routes = (
            <Switch>
              <Route path="/" exact component={Home} />
              <Redirect to="/" />
            </Switch>
          );
        }
    
        return (
          <div>
            <Layout>
             {routes}
            </Layout>
          </div>
        );
      }
    }



export default withRouter(connect(
    state => { return { login: state.login, homeState: state.home }; },
    dispatch => bindActionCreators(actionCreators, dispatch)
)(MainContainer));