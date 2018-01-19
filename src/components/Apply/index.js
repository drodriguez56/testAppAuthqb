import React, { Component } from "react";
import axios from "axios";

import "./Apply.css";

class Apply extends Component {
  componentDidMount() {
    console.log(this.props);
    const { match: { params } } = this.props;
    if (params.realmId) {
      window.localStorage.setItem("realmId", params.realmId);
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
    }
  }
  render() {
    const { match: { params } } = this.props;
    return (
      <React.Fragment>
        {params.realmId ? (
          <div>
            <div className="loader" />
            <div className="loaderMessage">processing application</div>
          </div>
        ) : (
          <div>
            {this.props.location.state[0].message ||
              this.props.location.state[0].errorMessage}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Apply;
