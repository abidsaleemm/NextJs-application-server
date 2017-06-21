import React, { Component, PropTypes } from "react";
import io from "socket.io-client";

export default class extends Component {
//   static getInitialProps = ({ req }) => ({ 
//     projects: [],
//   });
  static async getInitialProps ({ query, res }) {
    const post = posts.find(post => post.slug === query.slug)

    if (!post && res) {
      res.statusCode = 404
    }

    return { post }
}

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
        Project Detail splash page 
      </div>
    );
  }
}
