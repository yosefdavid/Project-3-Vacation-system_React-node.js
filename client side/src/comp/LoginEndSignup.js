import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import { connect } from "react-redux";


class LoginEndSignup extends Component {

  render() {

    return (

      <Router>

        <div className="login-signup-comps">

          <div className="row">

            <div className="col"><button className="btn-links"><Link className="btn btn-primary" onClick={this.refreshMsg.bind(this)} to="/login">Login</Link></button></div>

            <div className="col"><button className="btn-links"><Link className="btn btn-primary" onClick={this.refreshMsg.bind(this)} to="/singup">Signup</Link></button></div>

          </div>

          <Route exact path="/" component={Login} />

          <Route path="/login" component={Login} />

          <Route path="/singup" component={Signup} />

          <Route path="/allvacations" component={Login} />

          <Route path="/reports" component={Login} />

        </div>

      </Router>

    );

  }

  refreshMsg() {

    this.props.dispatchChange({
      type: "DELETE_MSG",
      data: ""
    })

  }


}


let mapDispatchToProps = function (dispatch) {

  let obj = {

    dispatchChange: function (data) {

      dispatch(data);

    }

  }

  return obj;

}


const loginEndSignup = connect(null, mapDispatchToProps)(LoginEndSignup);

export default loginEndSignup;