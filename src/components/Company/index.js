import React, { Component } from "react";
import axios from "axios";
import { withAuthenticator } from "aws-amplify-react";

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = { idToken: null, loading: true, company: null };
  }
  componentDidMount() {
    let token;
    Object.keys(window.localStorage).map(id => {
      if (id.toString().includes("idToken")) {
        token = window.localStorage[id];
        return true;
      } else return false;
    });
    this.setState({ idToken: token });
    if (token) {
      axios({
        methid: "get",
        url:
          "https://a0i5dxyze5.execute-api.us-east-1.amazonaws.com/dev/api/company",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token
        }
      })
        .then(res => {
          this.setState({ loading: false, company: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    const { company, loading } = this.state;
    return (
      <React.Fragment>
        <div>{loading && "loading data"}</div>
        {company ? (
          <div>
            <p>apply link</p>
            <p>http://localhost:3000/apply/{company._id}</p>
            {company.users.length > 0 ? (
              <div>
                <p>Clients</p>
                {company.users.map(client => (
                  <a key={client._id}>{`${client.firstname} ${
                    client.lastname
                  }`}</a>
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

export default withAuthenticator(Company, { includeGreetings: true });
