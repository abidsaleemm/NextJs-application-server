import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import Nav from "../components/nav";
import Styles from "../components/styles";
import Loader from "../containers/loader"; // TODO Requires a store. Should probably have a check for this.

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
    <Loader />
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

      const { setUser } = actions;

      if (isServer !== undefined) {
        const { admin = false, client = false } = isServer
          ? store.dispatch(setUser(user))
          : store.dispatch({ type: "server/getUser" });

        return {
          ...WrappedComponent.getInitialProps({
            ...props
          })
        };
      }

      // Defaults to log in page
      return WrappedComponent.getInitialProps(props);
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
dispatch => bindActionCreators(actions, dispatch);

export default (WrappedComponent, ...params) =>
  connect(
    ({ user }) => ({
      user
    }),
    dispatch => bindActionCreators(actions, dispatch)
  )(WrapperEnhanced(WrappedComponent, ...params));
