import React, { Component } from 'react';
import { connect } from "react-redux";
import { FollowersChange } from "../state/actions";
import io from 'socket.io-client';
var Chart = require('chart.js');


class Reports extends Component {

  componentDidMount() {

    this.createChart();

    const socket = io('http://localhost:8888');

    socket.on("followersChange", (msg) => {

      this.props.dispatchChange(FollowersChange(this.createChart.bind(this)));

    });

  }

  createChart() {

    let vacationfollowers = this.props.vacation.filter(v => v.followers != 0);

    let labelsArry = [];
    let NumOfFollowers = [];

    for (let i = 0; i < vacationfollowers.length; i++) {

      labelsArry.push(`${vacationfollowers[i].destination} ID:${vacationfollowers[i].id}`);

      NumOfFollowers.push(vacationfollowers[i].followers);

    }

    var ctx = document.getElementById('myChart').getContext('2d');

    var stackedBar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labelsArry,
        datasets: [{
          label: 'Followers',
          data: NumOfFollowers,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });

  }

  render() {

    return (

      <div>

        <div className="row">

          <div className="col">

            <canvas id="myChart" className="canvas"></canvas>

          </div>

        </div>

      </div>

    );

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

const reports = connect(mapStateToProps, mapDispatchToProps)(Reports);

export default reports;


