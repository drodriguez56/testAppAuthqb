import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

class App extends Component {
  hancleConncect = () => {
    axios({
      method: "get",
      url:
        "https://hzzdtkh6m8.execute-api.us-east-1.amazonaws.com/dev/api/qbAuthUrl"
    })
      .then(res => {
        window.location.href = res.data.location;
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    const params = this.getSearchParameters();
    if (params.code) {
      axios({
        method: "post",
        data: { params },
        url:
          "https://hzzdtkh6m8.execute-api.us-east-1.amazonaws.com/dev/api/qbCallback"
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response.data.errorMessage);
        });
    }
  }

  getSearchParameters = () => {
    var prmstr = window.location.search.substr(1);
    return prmstr !== null && prmstr !== ""
      ? this.transformToAssocArray(prmstr)
      : {};
  };

  transformToAssocArray = prmstr => {
    var params = {};
    var prmarr = prmstr.split("&");
    for (var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
    }
    return params;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={() => this.hancleConncect()}> connect to qb </button>
        </p>
      </div>
    );
  }
}

export default App;
