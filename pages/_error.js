import React, { Component } from "react";
import ErrorDefault from "next/error";
import Loader from "../components/Loader";

export default class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res
      ? res.statusCode
      : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return <Loader fetching />;
  }
}

// <ErrorDefault statusCode={this.props.statusCode} />;
