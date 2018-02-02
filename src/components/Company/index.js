import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./company.css";

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = { idToken: null, loading: true, company: null };
  }
  componentDidMount() {
    axios({
      method: "get",
      url:
        "https://auu0bifd3k.execute-api.us-east-1.amazonaws.com/dev/api/company/5a6a6b85f23dce0001e14de3"
    })
      .then(res => {
        this.setState({ loading: false, company: res.data[0] });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { company, loading } = this.state;
    return (
      <React.Fragment>
        <div>{loading && "loading data"}</div>
        {company ? (
          <div>
            <p>apply link</p>
            <p>
              {window.location.hostname}
              {(window.location.hostname.includes("localhost") && ":3000") ||
                ""}/apply/{company._id}
            </p>
            {company.users.length > 0 ? (
              <div>
                <p>Clients</p>
                {company.users.map(client => (
                  <div className="client" key={client._id}>
                    <p>
                      {`${client.firstname} ${client.lastname}`} --{" "}
                      {client.email}
                    </p>
                    <p className="subtitle">
                      <b>Reports</b>
                    </p>
                    <Link
                      to={{
                        pathname: "/report",
                        state: { client, reportType: "BalanceSheet" }
                      }}
                    >
                      Balance Sheet
                    </Link>
                    <Link
                      to={{
                        pathname: "/report",
                        state: { client, reportType: "ProfitAndLoss" }
                      }}
                    >
                      Profit And Loss
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>no clients applied yet</div>
            )}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Company;
