import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {actionCreators} from '../store/Login'
import LoginForm from '../components/login/LoginForm';
import { Redirect } from "react-router-dom";

class LoginContainer extends Component {
    componentDidMount(){
        document.title = "ورود به سیستم"
      }
    render() {
        const {login,requestLogin}=this.props
        if (login.isAuthenticated) {
            return <Redirect to={"/"} />;
          }

        return (
            <div ss='s'>
                <LoginForm  handleForm={requestLogin} errorMessage={login.error} />
            </div>
        );
    }
} 


export default connect(
    state=> { return {login:state.login};},
    dispatch => bindActionCreators (actionCreators, dispatch)
)(LoginContainer);