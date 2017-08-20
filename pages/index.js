import React, { Component } from "react";
import Styles from "../hoc/styles";
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

const Enhanced = Styles(EntryPage);
Enhanced.getInitialProps = EntryPage.getInitialProps;
export default Enhanced;
