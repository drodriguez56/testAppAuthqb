import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
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
        "https://5crjz5pq9f.execute-api.us-east-1.amazonaws.com/dev/api/company/5a809470f996cb0001402cb2"
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
          <div className="company">
            <p style={{ display: "inline-block", marginRight: "10px" }}>
              <b>Share this link for clients to apply:</b>
            </p>
            <p className="link">
              {window.location.hostname}
              {(window.location.hostname.includes("localhost") && ":3000") ||
                ""}/apply/{company._id}
            </p>
            {company.applications.length > 0 ? (
              <div>
                <p>Clients</p>
                {company.applications.map(application => (
                  <div className="client" key={application._id}>
                    <p>
                      {`${application.user.firstname} ${
                        application.user.lastname
                      }`}{" "}
                      -- {application.user.email}
                    </p>
                    <p className="subtitle">
                      <b>Reports</b>
                    </p>
                    <Link
                      to={{
                        pathname: "/report",
                        state: {
                          client: application.user,
                          reportType: "BalanceSheet"
                        }
                      }}
                    >
                      Balance Sheet
                    </Link>
                    <Link
                      to={{
                        pathname: "/report",
                        state: {
                          client: application.user,
                          reportType: "ProfitAndLoss"
                        }
                      }}
                    >
                      Profit And Loss
                    </Link>
                    <Link
                      to={{
                        pathname: "/report",
                        state: {
                          client: application.user,
                          reportType: "AgedReceivables"
                        }
                      }}
                    >
                      Aged Receivables
                    </Link>
                    <Link
                      to={{
                        pathname: "/report",
                        state: {
                          client: application.user,
                          reportType: "AgedPayables"
                        }
                      }}
                    >
                      Aged Payables
                    </Link>
                    <Link
                      to={{
                        pathname: "/report",
                        state: {
                          client: application.user,
                          reportType: "AgedPayableDetail",
                          date: {
                            start: {
                              key: "start_duedate"
                            },
                            end: {
                              key: "end_duedate"
                            }
                          }
                        }
                      }}
                    >
                      AP Detail
                    </Link>
                    <Link
                      to={{
                        pathname: "/report",
                        state: {
                          client: application.user,
                          reportType: "AgedReceivableDetail",
                          date: {
                            start: {
                              key: "start_duedate"
                            },
                            end: {
                              key: "end_duedate"
                            }
                          }
                        }
                      }}
                    >
                      AR Detail
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>No clients have applied yet</p>
              </div>
            )}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Company;
