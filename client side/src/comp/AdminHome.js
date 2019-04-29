import React, { Component } from 'react';
import { connect } from "react-redux";
import { DeleteVacation } from "../state/actions";
import { EditVacation } from "../state/actions";
import { FollowersChange } from "../state/actions";
import io from 'socket.io-client';


class AdminHome extends Component {

  state = {

    vacationId: "",
    vacationDestination: "",
    vacationDescription: "",
    vacationFromDate: "",
    vacationEndDate: "",
    vacationFollowers: "",
    vacationImgs: "",
    vacationPrice: "",
    newVacationDestination: "",
    newVacationImgs: "",
    typeFile: "",
    msg: ""

  }

  componentDidMount() {

    const socket = io('http://localhost:8888');

    socket.on("followersChange", (msg) => {

      this.props.dispatchChange(FollowersChange());

    });

  }

  render() {

    return (

      <div className="admin-home-comp">

        {/* delete-modal */}
        <div id="delete-modal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div><img src={this.state.vacationImgs} /><h4 className="modal-title">{this.state.vacationDestination}</h4></div>
                <div>Vacation ID: {this.state.vacationId}</div>
              </div>
              <div className="modal-body">
                <div>Are you sure you want to delete this vacation?</div>
                <div className="row-warrnig"><label className="fas fa-exclamation-triangle" ></label>This vacation has {this.state.vacationFollowers} followers!</div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={this.deleteVacation.bind(this, this.state.vacationId)} className="btn btn-success" data-dismiss="modal">I'm sure</button>
                <button type="button" onClick={this.restartState.bind(this)} className="btn btn-primary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        {/* edit-modal */}
        <div id="edit-modal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div><img src={this.state.vacationImgs} /><h4 className="modal-title">{this.state.vacationDestination} </h4></div>
                <div>Vacation ID: {this.state.vacationId}</div>
              </div>

              <div className="modal-body">

                <div className="row" >

                  <div className="col">Destination:</div>
                  <div className="col"><input type="text" name="newVacationDestination" onChange={this.handleText.bind(this)} value={this.state.newVacationDestination} ></input></div>

                </div>

                <div className="row" >

                  <div className="col">Description:</div>
                  <div className="col"><textarea name="vacationDescription" onChange={this.handleText.bind(this)} value={this.state.vacationDescription}></textarea></div>

                </div>

                <div className="row" >

                  <div className="col">image:</div>
                  <div className="col"><input id="img-upp-edit" className="img-upp" type="file" name="newVacationImgs" onChange={this.handleText.bind(this)}></input></div>

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
                
                <button type="button" onClick={this.sendVacation.bind(this)} className="btn btn-success">Edit</button>
                <button type="button" onClick={this.restartState.bind(this)} className="btn btn-primary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">

          <div className="col">

            {this.props.vacation.map(v => {

              return (

                <div key={v.id} className="card" style={{ width: "18rem" }}>
                  <div>
                    <button type="button" onClick={this.startState.bind(this, v.id, v.destination, v.description, v.from_date, v.end_date, v.followers, v.image, v.price)} className="fas fa-edit edit-icon btn btn-light" data-toggle="modal" data-target="#edit-modal"></button>
                    <button type="button" onClick={this.startState.bind(this, v.id, v.destination, v.description, v.from_date, v.end_date, v.followers, v.image, v.price)} className="fas fa-trash-alt btn btn-light" data-toggle="modal" data-target="#delete-modal"></button>
                  </div>
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
                      <li className="list-group-item"><label className="fas fa-eye eye-icon">{v.followers}</label></li>
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

  restartState() {

    this.setState({

      vacationId: "",
      vacationDestination: "",
      vacationDescription: "",
      vacationFromDate: "",
      vacationEndDate: "",
      vacationFollowers: "",
      vacationImgs: "",
      vacationPrice: "",
      newVacationDestination: "",
      newVacationImgs: "",
      typeFile: "",
      msg: ""

    });

    document.getElementById('img-upp-edit').value = "";

  }

  handleText(ev) {

    if (ev.target.name == "newVacationImgs") {

      let file = ev.target.files[0];

      if (file) {

        if (file.type == "image/jpeg") {

          let reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = () => {

            this.setState({ typeFile: file.type, newVacationImgs: reader.result, msg: "" });

          }

        }

        else {

          this.setState({ typeFile: "error", newVacationImgs: "error", msg: "Upload only a jpeg image file!" });

        }

      }

      else {

        this.setState({ typeFile: "", newVacationImgs: "", msg: "" });

      }

    }

    else {

      this.setState({ [ev.target.name]: ev.target.value });

    }

  }

  startState(vId, vDestination, vDescription, vFrom_date, vEnd_date, vFollowers, vImage, vPrice) {

    this.setState({

      vacationId: vId,
      vacationDestination: vDestination,
      vacationDescription: vDescription,
      vacationFromDate: vFrom_date,
      vacationEndDate: vEnd_date,
      vacationFollowers: vFollowers,
      vacationImgs: vImage,
      vacationPrice: vPrice,
      newVacationDestination: vDestination,
      newVacationImgs: vImage,
      typeFile: "image/jpeg",
      msg: ""

    });

  }

  deleteVacation(viId) {

    this.props.dispatchChange(DeleteVacation(viId));

  }

  sendVacation() {

    if (this.state.newVacationDestination == "" || this.state.vacationDescription == "" || this.state.newVacationImgs == "" || this.state.vacationFromDate == "" || this.state.vacationEndDate == "" || this.state.vacationPrice == "") {

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
            vacationId: this.state.vacationId,
            vacationBody: {
              destination: this.state.newVacationDestination,
              description: this.state.vacationDescription,
              image: this.state.newVacationImgs,
              from_date: this.state.vacationFromDate,
              end_date: this.state.vacationEndDate,
              price: this.state.vacationPrice
            }
          }

          this.props.dispatchChange(EditVacation(objToSend));

          document.getElementById('img-upp-edit').value = "";
          window.$('#edit-modal').modal('hide');

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

  return { vacation: state.vacationsOnFoolow };

}

const adminHome = connect(mapStateToProps, mapDispatchToProps)(AdminHome);

export default adminHome;