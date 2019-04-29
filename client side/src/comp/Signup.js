import React, { Component } from 'react';
import { connect } from "react-redux";
import { SIgnup } from "../state/actions";


class Signup extends Component {

  state = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    role: "user"
  }

  render() {

    return (

      <div className="signup-comp">

        <div className="row">

          <div className="col">

            <h1>Registration</h1>

          </div>

        </div>

        <div>

          <div className="row">

            <div className="col">First name:</div>
            <div className="col"><input name="first_name" onChange={this.handleText.bind(this)} value={this.state.first_name} /></div>

          </div>

          <div className="row">

            <div className="col">Last name:</div>
            <div className="col"><input name="last_name" onChange={this.handleText.bind(this)} value={this.state.last_name} /></div>

          </div>

          <div className="row">

            <div className="col">User name:</div>
            <div className="col"><input name="username" onChange={this.handleText.bind(this)} value={this.state.username} /></div>

          </div>

          <div className="row">

            <div className="col">Password:</div>
            <div className="col"><input name="password" onChange={this.handleText.bind(this)} value={this.state.password} /></div>

          </div>

          <div className="row row-signup">

            <div className="col"><button className="btn btn-success" onClick={this.signup.bind(this)}>Signup</button></div>

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

  signup() {

    if (!this.state.first_name || !this.state.last_name || !this.state.username || !this.state.password) {

      this.props.dispatchChange({
        type: "SIGNUP",
        data: { msg: "Please fill all input fields!" }
      })

    }

    else {

      if (isNaN(this.state.password) || this.state.password.length < 4 || this.state.password.length > 8) {

        this.props.dispatchChange({
          type: "SIGNUP",
          data: { msg: "Password must be numbers between 4 and 8 digits!" }
        })

      }

      else {

        this.props.dispatchChange(SIgnup(this.state, this));

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

const signup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default signup;



