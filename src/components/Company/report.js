import React, { Component } from "react";
import axios from "axios";
import decode from "jwt-decode";

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = { report: null, loading: true };
  }
  componentDidMount() {
    const { location: { state: { client, reportType } } } = this.props;
    const tokens = JSON.parse(client.session);
    const data = decode(tokens.data.id_token);
    // date format YYYY-MM-DD
    this.setState({ loading: true });
    if (client) {
      const { session, realmId } = client;
      axios({
        method: "post",
        data: {
          session: JSON.parse(session),
          realmId: data.realmid,
          reportType,
          startDate: "2017-06-01",
          endDate: "2018-01-28"
        },
        url: `https://auu0bifd3k.execute-api.us-east-1.amazonaws.com/dev/api/report`
      })
        .then(res => {
          const body = JSON.parse(res.data.body);
          this.setState({ loading: false, report: JSON.parse(body) });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  renderReport = (report, secondTime) => {
    console.log(report);
    let renderReport = [];
    const allrows =
      report.Rows &&
      report.Rows.Row.map(row => {
        const headers =
          row.Header &&
          row.Header.ColData.map(titile => {
            return <p>{titile.value}</p>;
          });
        const rows =
          row.Rows &&
          row.Rows.Row.map(innerRow => {
            const innerRows = this.renderReport({ ...innerRow }, true);

            return innerRows;
          });
        const cols =
          row.ColData &&
          row.ColData.map(col => {
            return <p>{col.value}</p>;
          });
        const summary =
          row.Summary &&
          row.Summary.ColData.map(colData => {
            return <p>{colData.value}</p>;
          });
        renderReport = [...renderReport, headers, rows, cols, summary];
      });

    const cols =
      report.ColData &&
      report.ColData.map(data => {
        return <p>{data.value}</p>;
      });

    return [...renderReport, allrows, cols];
  };
  render() {
    const { loading, report } = this.state;
    return (
      <div>
        {loading && !report ? (
          <div>loading</div>
        ) : (
          <div>{this.renderReport(report, false)}</div>
        )}
      </div>
    );
  }
}

export default Report;
