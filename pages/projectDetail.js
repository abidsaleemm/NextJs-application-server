import React, { Component, PropTypes } from "react";
import io from "socket.io-client";

export default class extends Component {
//   static getInitialProps = ({ req }) => ({ 
//     projects: [],
//   });

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    // const { state: { 
    //   projects = [],
    //   width = 500,
    //   height = 100,
    // } } = this;

    return (
      <div>
        Project Detail splah page 
      </div>
    );
  }
}
