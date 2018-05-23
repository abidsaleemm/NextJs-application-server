import React, { Component } from "react";
// import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
// import { initStore } from "../store";
import { connect } from 'react-redux';
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import LoginPage from "../components/LoginPage";

const EntryPage = class extends Component {
  static async getInitialProps(props) {
    const { req: { session = {} } = {} } = props;
    const { sessionFlash } = session;

    return { sessionFlash };
  }

  render() {
    const {
      props: { staging, sessionFlash: { error } = {} } = {}
    } = this;

    return <LoginPage staging={staging} error={error} />;
  }
};

export default connect(
//   initStore,
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch)
)(Wrapper(EntryPage, { nav: false, loader: false }));
