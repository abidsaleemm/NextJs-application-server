import React, { Component, PropTypes } from "react";
import Nav from '../components/nav';

export default class extends Component {
  static getInitialProps({ req, query }) { 
    const { projectDetail } = query;
    console.log('projectDetail', projectDetail);
    return { projectDetail };
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Nav />
        <div>
          Project Detail splash page 
        </div>
      </div>
    );
  }
}
