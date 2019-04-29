import React, { Component } from 'react';
import { connect } from "react-redux";
import { LOgout } from "../state/actions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AdminHome from './AdminHome';
import Reports from './Reports';
import { addVacation } from "../state/actions";


class Admin extends Component {

  state = {

    vacationDestination: "",
    vacationDescription: "",
    vacationFromDate: "",
    vacationEndDate: "",
    vacationFollowers: 0,
    vacationImgs: "",
    typeFile: "",
    vacationPrice: "",
    msg: ""

  }

  render() {

    return (

      <Router>

        <div className="admin-comp">

          {/* add-vacation-modal */}
          <div id="add-vacation-modal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div><img src="https://www.hon.co.il/wp-content/uploads/2016/02/vacation-480x320.jpg" /></div>
                  <div><h4 className="modal-title">Add vacation</h4></div>

                </div>

                <div className="modal-body">

                  <div className="row" >

                    <div className="col">Destination:</div>
                    <div className="col"><input type="text" name="vacationDestination" onChange={this.handleText.bind(this)} value={this.state.vacationDestination} ></input></div>

                  </div>

                  <div className="row" >

                    <div className="col">Description:</div>
                    <div className="col"><textarea name="vacationDescription" onChange={this.handleText.bind(this)} value={this.state.vacationDescription}></textarea></div>

                  </div>

                  <div className="row" >

                    <div className="col">image:</div>
                    <div className="col"><input id="img-upp-add" className="img-upp" type="file" name="vacationImgs" onChange={this.handleText.bind(this)} ></input></div>

                  </div>

                  <div className="row" >

                    <div className="col">From date:</div>
                    <div className="col"><input type="text" placeholder="DD/MM/YYYY" name="vacationFromDate" onChange={this.handleText.bind(this)} value={this.state.vacationFromDate}></input></div>

                  </div>

                  <div className="row" >

                    <div className="col">End date:</div>
                    <div className="col"><input type="text" placeholder="DD/MM/YYYY" name="vacationEndDate" onChange={this.handleText.bind(this)} value={this.state.vacationEndDate} ></input></div>

                  </div>

                  <div className="row" >

                    <div className="col">Price:</div>
                    <div className="col"><input type="text" name="vacationPrice" onChange={this.handleText.bind(this)} value={this.state.vacationPrice} ></input></div>

                  </div>

                </div>

                <div className="modal-footer">

                  <div className="row" >

                    <div className="col">{this.state.msg}</div>

                  </div>

                  <button type="button" onClick={this.sendVacation.bind(this)} className="btn btn-success">Add</button>
                  <button type="button" onClick={this.restartState.bind(this)} className="btn btn-primary" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>


          <div className="row">

            <div className="col-4 col-header">
              <h3>Hello {this.props.username}</h3>
              <label>Administrator</label>
            </div>

            <div className="col-6 col-header">
              <button className="btn-nav btn-links"><Link className="btn btn-primary" to="/allvacations">Vacations</Link></button>
              <button type="button" className="btn-nav btn btn-primary" data-toggle="modal" data-target="#add-vacation-modal">Add vacation</button>
              <button className="btn-nav btn-links"><Link className="btn btn-primary" to="/reports">Reports</Link></button>
              <button className="btn-nav btn btn-info" onClick={this.logout.bind(this)}>Logout</button>
            </div>

          </div>

          <Route exact path="/" component={AdminHome} />

          <Route path="/login" component={AdminHome} />

          <Route path="/allvacations" component={AdminHome} />

          <Route path="/reports" component={Reports} />

        </div>

      </Router>

    );

  }


  logout() {

    this.props.dispatchChange(LOgout());

  }

  restartState() {

    this.setState({

      vacationDestination: "",
      vacationDescription: "",
      vacationFromDate: "",
      vacationEndDate: "",
      vacationFollowers: 0,
      vacationImgs: "",
      typeFile: "",
      vacationPrice: "",
      msg: ""

    });

    document.getElementById('img-upp-add').value = "";

  }

  handleText(ev) {

    if (ev.target.name == "vacationImgs") {

      let file = ev.target.files[0];

      if (file) {

        if (file.type == "image/jpeg") {

          let reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = () => {

            this.setState({ typeFile: file.type, vacationImgs: reader.result, msg: "" });

          }

        }

        else {

          this.setState({ typeFile: "error", vacationImgs: "error", msg: "Upload only a jpeg image file!" });

        }

      }

      else {

        this.setState({ typeFile: "", vacationImgs: "", msg: "" });

      }

    }

    else {

      this.setState({ [ev.target.name]: ev.target.value });

    }

  }

  sendVacation() {

    if (this.state.vacationDestination == "" || this.state.vacationDescription == "" || this.state.vacationImgs == "" || this.state.vacationFromDate == "" || this.state.vacationEndDate == "" || this.state.vacationPrice == "") {

      this.setState({ msg: "Please fill all input fields!" });

    }

    else {

      if (isNaN(this.state.vacationPrice)) {

        this.setState({ msg: "Price should be only numbers!" });

      }

      else {

        if (this.state.typeFile != "image/jpeg") {

          this.setState({ msg: "Upload only a jpeg image file" });

        }

        else {

          let objToSend = {
            destination: this.state.vacationDestination,
            description: this.state.vacationDescription,
            image: this.state.vacationImgs,
            from_date: this.state.vacationFromDate,
            end_date: this.state.vacationEndDate,
            followers: this.state.vacationFollowers,
            price: this.state.vacationPrice
          }

          this.props.dispatchChange(addVacation(objToSend, this));

          document.getElementById('img-upp-add').value = "";
          window.$('#add-vacation-modal').modal('hide');

        }

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

  return { username: state.username, vacation: state.vacationsOnFoolow };

}

const admin = connect(mapStateToProps, mapDispatchToProps)(Admin);

export default admin;


