import React from "react";
import { withAuthenticator } from "aws-amplify-react";

const Company = () => {
  return <div>this is potected</div>;
};

export default withAuthenticator(Company, { includeGreetings: true });
