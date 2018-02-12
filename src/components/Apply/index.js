import React, { Component } from "react";
import axios from "axios";
import ProgressButton from "react-progress-button";

import "./Apply.css";

class Apply extends Component {
  constructor(props) {
    super(props);

    this.state = { buttonState: "disabled" };
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    if (params.realmId) {
      window.localStorage.setItem("realmId", params.realmId);
      this.setState({ buttonState: "loading" });
      axios({
        method: "get",
        url:
          "https://5crjz5pq9f.execute-api.us-east-1.amazonaws.com/dev/api/qbAuthUrl"
      })
        .then(res => {
          window.location.href = res.data.location;
        })
        .catch(err => {
          this.setState({ buttonState: "error" });
          console.log(err);
        });
    } else if (this.props.location.state[0].error) {
      this.setState({ buttonState: "error" });
    } else {
      this.setState({ buttonState: "success" });
    }
  }

  render() {
    const { match: { params } } = this.props;
    return (
      <React.Fragment>
        <div style={{ width: "100px", margin: "0 auto" }}>
          <ProgressButton
            durationSuccess={50000}
            durationError={50000}
            state={this.state.buttonState}
          />
        </div>
        {params.realmId ? (
          <div>
            <div className="loaderMessage">
              <p>processing application</p>
            </div>
          </div>
        ) : (
          <div className="loaderMessage">
            <p>
              {(this.props.location.state &&
                (this.props.location.state[0].message ||
                  this.props.location.state[0].errorMessage)) ||
                "this is not a valid link to apply...please re apply"}
            </p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Apply;
