import React, { Component } from "react";
import axios from "axios";

class Calback extends Component {
  componentDidMount() {
    const searchParams = this.getSearchParameters();
    const realmId = window.localStorage.getItem("realmId");
    if (realmId) {
      axios({
        method: "post",
        data: { ...searchParams, realmId },
        url:
          "https://opwhtrvvni.execute-api.us-east-1.amazonaws.com/dev/api/qbCallback"
      })
        .then(res => {
          if (res.data.session) {
            axios({
              method: "post",
              data: { session: res.data.session },
              url:
                "https://opwhtrvvni.execute-api.us-east-1.amazonaws.com/dev/api/connected"
            })
              .then(resp => {
                let test;
                let message;
                if (resp.data.statusCode === 501) {
                  test = false;
                  message = "You already applyed";
                } else {
                  test = true;
                  message = "Application was successfull";
                }
                this.props.history.push("/apply", [{ test, message }]);
              })
              .catch(err => {
                this.props.history.push("/apply", [
                  {
                    err: true,
                    message: "",
                    errorMessage: err.response.data.errorMessage
                  }
                ]);
              });
          } else {
            this.props.history.push("/apply", [
              {
                err: true,
                message: "",
                errorMessage: "something went wrong please try again"
              }
            ]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("a realm id needs to be provided");
      this.props.history.push("/");
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
    // recieve callback url
    return (
      <React.Fragment>
        <div className="loader" />
        <div className="loaderMessage">processing application</div>
      </React.Fragment>
    );
  }
}
export default Calback;
