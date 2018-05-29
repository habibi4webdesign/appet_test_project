import React, { Component } from 'react';
import classNames from 'classnames';

export class AppInlineProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {

        return  <div>
                    <div className={classNames('profile', {'profile-expanded': this.state.expanded})}>
                        <a onClick={this.onClick}>
                        <div className="profile-image" ></div>
                        <span className="topbar-item-name">
                        </span>
                        </a>

                    </div>
                    
                    <ul className="layout-menu profile-menu">
                        <li role="menuitem">
                            <a tabIndex={this.state.expanded ? null : '-1'} >
                            <i className="fa fa-fw fa-sign-out"></i>
                            <span>خروج</span>
                            </a>
                        </li>
                    </ul>
                </div>
    }
}