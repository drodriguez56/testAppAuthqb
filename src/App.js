import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { session: null, info: null, data: null, loading: false };
  }
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
      this.setState({ loading: true });
      axios({
        method: "post",
        data: { ...params, realmId: 123 },
        url:
          "https://hzzdtkh6m8.execute-api.us-east-1.amazonaws.com/dev/api/qbCallback"
      })
        .then(res => {
          const session = { ...res.data.session, realmId: params.realmId };
          this.setState({
            session
          });
          this.handleLoadInfo(session);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleLoadInfo = session => {
    axios({
      method: "post",
      data: { session },
      url:
        "https://hzzdtkh6m8.execute-api.us-east-1.amazonaws.com/dev/api/connected"
    })
      .then(res => {
        this.setState({ data: { ...res.data.data }, loading: false });
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
      });
  };

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
        {this.state.loading ? (
          <p>Loading data...</p>
        ) : (
          <div className="App-intro">
            <button onClick={() => this.hancleConncect()}>
              {" "}
              connect to qb{" "}
            </button>
            {this.state.data ? (
              <div>
                <p>email: {this.state.data.email}</p>
                <p>
                  name:{" "}
                  {`${this.state.data.givenName} ${this.state.data.familyName}`}
                </p>
                <p>phone: {this.state.data.phoneNumber}</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default App;
