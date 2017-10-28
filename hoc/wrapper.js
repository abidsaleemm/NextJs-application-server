import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// import withRedux from "next-redux-wrapper";
import * as actions from '../actions';
import Nav from "../components/nav";
import Styles from "../components/styles";
import Loader from "../containers/loader"; // TODO Requires a store. Should probably have a check for this.

// TODO This should be an action?
// import fetchApi from "../helpers/fetchApi";

// TODO Getting ENV vars from server to stay on client requires a hack.  Might be better way in future.
// Embed in DOM
const { STAGING } =
  "undefined" !== typeof window ? window.env : process.env;

const Wrapper = (
  WrappedComponent,
  { nav = true, loader = true } = {}
) => props => (
  <div className="root">
    <style jsx global>
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
    {loader ? <Loader {...props} /> : null}
    <WrappedComponent {...props} />
    <script
      dangerouslySetInnerHTML={{
        __html: `env = {}; ${STAGING ? "env.STAGING = true;" : ""} `
      }}
    />
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

      // console.log("store", store);
      // const admin = false;
      // const client = false;

      // id: userId = 0
      // const userId = 0;

      // const state = store.getState();
      // console.log("state", state);

      const { setUser } = actions;

      if (isServer !== undefined) {
        const {
          admin = false,
          client = false
          //   id: userId = 0
        } = isServer
          ? store.dispatch(setUser(user))
          : store.dispatch({ type: "server/getUser" });

        return {
          ...WrappedComponent.getInitialProps({
            ...props,
            // ...store.getState(),
            // client,
            // admin,
            // userId
          }),
          // ...props,
          // ...store.getState(),
          // client,
          // admin,
          // isServer
        };
      }

      // Defaults to log in page
      return WrappedComponent.getInitialProps({
        props,
      });
    };

    constructor(props) {
      super(props);

      // TODO I believe this should not go under render method, but not sure
      this.Enhanced = Wrapper(WrappedComponent, ...params);
    }

    render() {
      const { Enhanced, props } = this;
      // console.log('props', props);

      return <Enhanced {...props} />;
    }
  };
dispatch =>
  bindActionCreators(actions, dispatch)
// import React, { Component } from "react";
// import withRedux from "next-redux-wrapper";
// import { connect } from 'react-redux';
// import Loader from '../components/loader';

export default (WrappedComponent, ...params) =>
  connect(
    ({ user }) => ({
      user
    }),
    dispatch => bindActionCreators(actions, dispatch)
  )(WrapperEnhanced(WrappedComponent, ...params));

// import { bindActionCreators } from "redux";
// import { Button, ButtonGroup, Table } from "reactstrap";
// import { initStore } from "../store";
// import * as actions from "../actions";
// import selectProjectList from "../selectors/selectProjectList";
