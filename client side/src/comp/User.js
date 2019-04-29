import React, { Component } from 'react';
import { connect } from "react-redux";
import { LOgout } from "../state/actions";
import { AddFollow } from "../state/actions";
import { RemoveFollow } from "../state/actions";
import { VacationsChange } from "../state/actions";
import io from 'socket.io-client';


class User extends Component {

  state = {
    checkedOn: true,
    checkedOff: false
  }

  componentDidMount() {

    const socket = io('http://localhost:8888');

    socket.on("vacationsChange", (msg) => {

      this.props.dispatchChange(VacationsChange());

    });

  }

  render() {

    return (

      <div className="user-comp">

        <div className="row">

          <div className="col-4 col-header"><h3>Hello {this.props.username}</h3></div>
          <div className="col-6 col-header"><button className="btn btn-info" onClick={this.logout.bind(this)}>Logout</button></div>

        </div>

        <div className="row row-main">

          <div className="col">

            {this.props.vacationsOnFoolow.map(v => {

              return (

                <div key={v.id} className="card" style={{ width: "18rem" }}>
                  <img src={v.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{v.destination}</h5>
                    <p className="card-text">{v.description}</p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p><label className="fas fa-plane-departure plane-icon"></label>{v.from_date}</p>
                        <p><label className="fas fa-plane-arrival plane-icon"></label>{v.end_date}</p>
                      </li>
                      <li className="list-group-item">{v.price}<label className="fas fa-dollar-sign dollar-icon"></label></li>
                      <li className="list-group-item"><input checked={this.state.checkedOn} onChange={this.changeFollow.bind(this, v.id)} type="checkbox" /><label className="fas fa-eye eye-icon">{v.followers}</label></li>
                    </ul>
                  </div>
                </div>

              )

            })}

            {this.props.vacationsOffFoolow.map(v => {

              return (

                <div key={v.id} className="card" style={{ width: "18rem" }}>
                  <img src={v.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{v.destination}</h5>
                    <p className="card-text">{v.description}</p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p><label className="fas fa-plane-departure plane-icon"></label>{v.from_date}</p>
                        <p><label className="fas fa-plane-arrival plane-icon"></label>{v.end_date}</p>
                      </li>
                      <li className="list-group-item">{v.price}<label className="fas fa-dollar-sign dollar-icon"></label></li>
                      <li className="list-group-item"><input checked={this.state.checkedOff} onChange={this.changeFollow.bind(this, v.id)} type="checkbox" /><label className="fas fa-eye eye-icon">{v.followers}</label></li>
                    </ul>
                  </div>
                </div>

              )

            })}

          </div>

        </div>

      </div>

    );

  }


  logout() {

    this.props.dispatchChange(LOgout());

  }

  changeFollow(vacationId, ev) {

    if (ev.target.checked) {

      this.props.dispatchChange(AddFollow(vacationId));

    }

    else {

      this.props.dispatchChange(RemoveFollow(vacationId));

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

  return { username: state.username, vacationsOnFoolow: state.vacationsOnFoolow, vacationsOffFoolow: state.vacationsOffFoolow };

}

const user = connect(mapStateToProps, mapDispatchToProps)(User);

export default user;




