import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from "../../store/HomeStore";
import { Redirect } from "react-router-dom";
import { Growl } from 'primereact/components/growl/Growl';

class Home extends Component {
  constructor() {
    super();
  }

  showError(message, messageType) {
    this.growl.show({ severity: messageType, life: 6000, detail: message });
  }

  componentDidMount() {
    this.props.homeInitialize();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.homeState.error) {
      nextProps.homeState.error.forEach(message => {
        this.showError(message, nextProps.homeState.messageType);
      })
    }
  }

  render() {
    if (this.props.homeState.homeStared) {
      return <Redirect to={"/home"} />;
    }

    return (

      <div className=" ui-g">
        <div className="ui-g-12">
          <Growl ref={(el) => { this.growl = el; }}></Growl>
          <div className="card">
              {this.props.homeState.user && <div><span>نام کاربر:</span><span>{this.props.homeState.user.user_name}</span></div>}
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  state => { return { homeState: state.home }; },
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);