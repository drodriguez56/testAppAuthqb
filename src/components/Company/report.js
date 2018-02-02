import React, { Component } from "react";
import axios from "axios";
import decode from "jwt-decode";
import moment from "moment";
import ProgressButton from "react-progress-button";
import "./company.css";

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      report: null,
      loading: true,
      startDate: moment().subtract(6, "months"),
      endDate: moment(),
      client: null,
      reportType: null
    };
  }
  componentDidMount() {
    const { location: { state: { client, reportType } } } = this.props;
    this.setState({ loading: true, client, reportType });
    this.loadReport(client, reportType);
  }

  loadReport = (client, reportType) => {
    // date format YYYY-MM-DD
    this.setState({ loading: true });
    const { startDate, endDate } = this.state;
    const tokens = JSON.parse(client.session);
    const data = decode(tokens.data.id_token);
    if (client) {
      const { session } = client;
      axios({
        method: "post",
        data: {
          session: JSON.parse(session),
          realmId: data.realmid,
          reportType,
          startDate,
          endDate
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
  };

  renderRows = object => {
    return object.Rows.Row.map((row, idx) => {
      return <div key={idx}>{this.renderObject(row)}</div>;
    });
  };

  renderObject = object => {
    if (!object) {
      return false;
    }
    const header = (
      <div className="header">{this.renderCol(object.Header)}</div>
    );
    const summary = (
      <div className="summary">{this.renderCol(object.Summary)}</div>
    );
    const col = (
      <div className="columns">{object.ColData && this.renderCol(object)}</div>
    );
    const row = (
      <div className="rows">
        {object.Rows && this.renderRows(object)}
        {summary}
      </div>
    );
    return (
      <React.Fragment>
        {header} {row} {col}
      </React.Fragment>
    );
  };
  renderCol = object => {
    if (!object) {
      return false;
    }
    return object.ColData.map(data => (
      <p
        key={data.value}
        className={`data ${(!isNaN(+data.value) && "number") || ""}`}
      >
        {data.value}
      </p>
    ));
  };

  handleChange = e => {
    const value = e.target.value;
    if (e.target.name === "startDate") {
      this.setState({ startDate: moment(value) });
    } else {
      this.setState({ endDate: moment(value) });
    }
  };
  handleSubmit = () => {
    this.loadReport(this.state.client, this.state.reportType);
  };

  render() {
    const { loading, report, startDate, endDate } = this.state;
    console.log(report);
    return (
      <div className="reportSection">
        {loading || !report ? (
          <ProgressButton disable="true" state={"loading"} />
        ) : (
          <div className="report">
            <h1 className="report-title">{report.Header.ReportName}</h1>
            <h2 className="report-dates">{`${startDate.format(
              "MMM DD YYYY"
            )} - ${endDate.format("MMM DD YYYY")}`}</h2>
            <div className="datePiker">
              <label>Start Date: </label>
              <input
                type="date"
                name="startDate"
                value={startDate.format("YYYY-MM-DD")}
                onChange={this.handleChange}
              />
              <label> End Date: </label>
              <input
                type="date"
                name="endDate"
                value={endDate.format("YYYY-MM-DD")}
                onChange={this.handleChange}
              />
              <button onClick={this.handleSubmit}>search new dates</button>
            </div>
            {report && report.Header.Option[1].Value === "false" ? (
              <div>{this.renderRows(report)}</div>
            ) : (
              <h3 className="noData">
                No data Available for the period selected
              </h3>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Report;
