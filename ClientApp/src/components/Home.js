import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';


const Home = props => { 
  return(
  <div className=" ui-g">
    <div className="ui-g-12">
      <div className="card">
         <h1 className="pad20A">اپت </h1>
      </div>

    </div>
  </div>
)};

export default connect()(Home);
