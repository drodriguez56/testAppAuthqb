import React, { Component } from "react";
import axios from "axios";
import decode from "jwt-decode";

class Report extends Component {
  componentDidMount() {
    const { location: { state: { client, reportType } } } = this.props;
    const tokens = JSON.parse(client.session);
    const data = decode(tokens.data.id_token);
    // date format YYYY-MM-DD
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
          console.log(JSON.parse(body));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    return <div>Report</div>;
  }
}

export default Report;
