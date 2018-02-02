import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Amplify from "aws-amplify";
import Apply from "./components/Apply";
import Callback from "./components/Callback";
import Company from "./components/Company";
import Report from "./components/Company/report";

// import aws_exports from "./aws-exports";

// Amplify.configure(aws_exports);

const Home = () => {
  // Home page
  return (
    <React.Fragment>
      <p>ZemDash Demo</p>
      <Link to="/company">go to company dashboard</Link>
    </React.Fragment>
  );
};

export default () => {
  return (
    <Router>
      <div style={{ margin: "100px" }}>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/apply/:realmId" component={Apply} />
          <Route path="/apply" component={Apply} />
          <Route path="/callback" component={Callback} />
          <Route path="/company" component={Company} />
          <Route path="/report" component={Report} />
        </Switch>
      </div>
    </Router>
  );
};
