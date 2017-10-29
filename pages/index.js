import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { initStore } from "../store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import LoginPage from "../components/loginPage";

const EntryPage = class extends Component {
  static async getInitialProps(props) {
    const { req: { session: { sessionFlash } = {} } = {} } = props;

    if (sessionFlash !== undefined) {
      //   session.sessionFlash = undefined;
      return { ...props, sessionFlash };
    }

    return props;
  }

  render() {
    const { props = {} } = this;
    return <LoginPage {...props} />;
  }
};

export default withRedux(
  initStore,
  () => {},
  dispatch => bindActionCreators(actions, dispatch)
)(Wrapper(EntryPage, { nav: false, loader: false }));
