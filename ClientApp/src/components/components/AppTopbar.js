import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from "../../store/HomeStore";

class AppTopbar extends Component {

    constructor() {
        super();
        this.state = {};
    }
    render() {

        return <div className="topbar clearfix">
            <div className="topbar-left" >
                <Link to="/" eventName="onTouchTap">  </Link>

            </div>

            <div className="topbar-right">
                <a id="menu-button" >
                    <i className="fa fa-angle-right"></i>
                </a>

                <a id="topbar-menu-button" >
                    <i className="fa fa-bars"></i>
                </a>
               
             
            </div>

        </div>;
    }
}

export default connect(
    state => { return { homeState: state.home }; },
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AppTopbar);