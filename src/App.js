import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Apply from "./components/Apply";
import Callback from "./components/Callback";

const Home = () => {
  // Home page
  return <p>Home Page</p>;
};

export default () => {
  return (
    <Router>
      <div style={{ margin: "100px" }}>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/apply/:realmId" component={Apply} />
          <Route path="/apply" component={Apply} />
        </Switch>
        <Route path="/callback" component={Callback} />
      </div>
    </Router>
  );
};
