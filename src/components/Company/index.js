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
          <div className="company">
            <p style={{ display: "inline-block", marginRight: "10px" }}>
              <b>Share this link for clients to apply:</b>
            </p>
            <p className="link">
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
                    <Link
                      to={{
                        pathname: "/report",
                        state: { client, reportType: "AgedReceivables" }
                      }}
                    >
                      Aged Receivables
                    </Link>
                    <Link
                      to={{
                        pathname: "/report",
                        state: { client, reportType: "AgedPayables" }
                      }}
                    >
                      Aged Payables
                    </Link>
                    <Link
                      to={{
                        pathname: "/report",
                        state: {
                          client,
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
                          client,
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
