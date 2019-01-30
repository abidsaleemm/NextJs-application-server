import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import Nav from "../components/Nav";
import Styles from "../components/Styles";
import Loader from "../containers/Loader"; // TODO Requires a store. Should probably have a check for this.

const Wrapper = (
  WrappedComponent,
  { nav = true, loader = true } = {}
) => props => (
  <div className="root">
    <style jsx global>
      {`
        @import url("https://fonts.googleapis.com/css?family=Muli");

        * {
          font-family: Muli;
        }
      `}
    </style>
    <style jsx>
      {`
        .root {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 100vh;
        }
      `}
    </style>
    <Styles {...props} />
    {nav ? <Nav {...props} /> : null}
    <Loader />
    <WrappedComponent {...props} />
  </div>
);

const WrapperEnhanced = (WrappedComponent, ...params) =>
  class extends Component {
    static getInitialProps = async props => {
      const {
        req: { session: { passport: { user } = {} } = {} } = {},
        isServer,
        store
      } = props;

      const { setUser } = actions;

      if (isServer !== undefined) {
        const { role = "user" } = isServer
          ? store.dispatch(setUser(user))
          : store.dispatch({ type: "server/getUser" });
      }

      return {
        ...(await WrappedComponent.getInitialProps(props)),
        staging: process.env.STAGING
      };
    };

    constructor(props) {
      super(props);

      // TODO I believe this should not go under render method, but not sure
      this.Enhanced = Wrapper(WrappedComponent, ...params);
    }

    render() {
      const { Enhanced, props } = this;
      return <Enhanced {...props} />;
    }
  };
dispatch => bindActionCreators(actions, dispatch);

export default (WrappedComponent, ...params) =>
  connect(
    ({ user }) => ({
      user
    }),
    dispatch => bindActionCreators(actions, dispatch)
  )(WrapperEnhanced(WrappedComponent, ...params));
