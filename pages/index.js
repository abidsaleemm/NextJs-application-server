import React, { Component } from "react";
import Wrapper from "../hoc/wrapper";
import LoginPage from "../components/loginPage";

const EntryPage = class extends Component {
  static getInitialProps({ req: { session } }) {
      let props = {};

      if (session.sessionFlash !== undefined) {
          props = { ...session.sessionFlash };
        //   session.sessionFlash = undefined;
      }

      return props;
  };

  render() {
    const { props = {} } = this;
    return <LoginPage {...props} />;
  }
};

export default Wrapper(EntryPage, { nav: false, loader: false });
