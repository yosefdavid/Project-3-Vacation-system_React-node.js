import React, { Component } from 'react';
import { connect } from "react-redux";
import { LOgin } from "../state/actions";

class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  render() {

    return (

      <div className="login-comp">

        <div className="row">

          <div className="col">

            <h1>Hello guest!</h1>

          </div>

        </div>

        <div className="row">

          <div className="col">

            <h3>Please login your account!</h3>

          </div>

        </div>

        <div className="login">

          <div className="row">

            <div className="col">Username:</div>
            <div className="col"><input name="username" onChange={this.handleText.bind(this)} value={this.state.username} /></div>

          </div>

          <div className="row">

            <div className="col">Password:</div>
            <div className="col"><input name="password" onChange={this.handleText.bind(this)} value={this.state.password} /></div>

          </div>

          <div className="row row-login">

            <div className="col"><button className="btn btn-success" onClick={this.login.bind(this)}>Login</button></div>

          </div>

          <div className="row">

            <div className="col msg">{this.props.msg}</div>

          </div>

        </div>

      </div>

    );

  }

  handleText(ev) {

    this.setState({ [ev.target.name]: ev.target.value });

  }

  login() {

    if (!this.state.username) {

      this.props.dispatchChange({
        type: "LOGIN",
        data: { msg: "Please enter a username!" }
      });

    }

    else {

      if (!this.state.password) {

        this.props.dispatchChange({
          type: "LOGIN",
          data: { msg: "Please enter a password!" }
        });

      }

      else {

        this.props.dispatchChange(LOgin(this.state, this));

      }

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

  return { msg: state.msg };

}

const login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default login;



