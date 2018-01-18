import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { session: null, info: null, data: null, loading: true };
  }

  handleConncect = () => {
    const params = this.getSearchParameters();
    if (!params.code) {
      axios({
        method: "get",
        url:
          "https://opwhtrvvni.execute-api.us-east-1.amazonaws.com/dev/api/qbAuthUrl"
      })
        .then(res => {
          window.location.href = res.data.location;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ loading: false, err: "clear url" });
    }
  };
  componentDidMount() {
    const params = this.getSearchParameters();
    if (params.code) {
      this.setState({ loading: true });
      axios({
        method: "post",
        data: { ...params, realmId: 123 },
        url:
          "https://opwhtrvvni.execute-api.us-east-1.amazonaws.com/dev/api/qbCallback"
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
    } else {
      this.handleConncect();
    }
  }

  handleLoadInfo = session => {
    axios({
      method: "post",
      data: { session },
      url:
        "https://opwhtrvvni.execute-api.us-east-1.amazonaws.com/dev/api/connected"
    })
      .then(res => {
        if (res.data.statusCode === 501) {
          this.setState({
            err: "account already created",
            loading: false
          });
        } else {
          this.setState({ data: true, loading: false });
        }
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
        <h1>ZemDash</h1>
        {this.state.loading ? (
          <div>
            <div class="loader" />
            <p>Processing Application...</p>
          </div>
        ) : (
          <div className="App-intro">
            {this.state.data ? (
              <div>
                <p>APPLICATION COMPLETE :)</p>
              </div>
            ) : null}
            {this.state.err ? (
              <div>
                <p>{this.state.err}</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default App;
