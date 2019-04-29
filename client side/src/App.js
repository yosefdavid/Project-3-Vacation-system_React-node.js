import React, { Component } from 'react';
import { connect } from "react-redux";
import LoginEndSingup from './comp/LoginEndSignup';
import User from './comp/User';
import Admin from './comp/Admin';
import { LOgin } from "./state/actions";


class App extends Component {

  componentDidMount() {

    this.props.dispatchChange(LOgin());

  }

  render() {

    if (!this.props.role) {

      return (

        <div className="container">

          <div className="LoginEndSingup-bg">

            <LoginEndSingup />

          </div>

        </div>

      )

    }

    if (this.props.role == "user") {

      return (

        <div className="container">

          <div className="user-bg">

            <User />

          </div>

        </div>

      )

    }

    if (this.props.role == "admin") {

      return (

        <div className="container">

          <div className="admin-bg">

            <Admin />

          </div>

        </div>

      )

    }

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

let mapStateToProps = function (state) {

  return { role: state.role };

}


const app = connect(mapStateToProps, mapDispatchToProps)(App);

export default app;



