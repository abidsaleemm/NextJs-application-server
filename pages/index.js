import React from "react";
import Link from "next/link";
// import io from "socket.io-client";
// import 'isomorphic-fetch';

import Nav from '../components/nav';
import ProjectList from "../components/projectList";
import styleSheet from "styles/global.scss";

// import { queryStudies } from "../dicom";

export default class extends React.Component {
  static async getInitialProps(props) {
    const { req } = props;
    // let projects = [];
    const host = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : 'https://multus.azurewebsites.net'; // TODO add a function for this
    console.log('host', host)

    // console.log('props', props)
    if (req) {
      const { queryStudies } = require("../dicom");
      const projects = await queryStudies();

      console.log('projects', projects);
      console.log('req.user', req.user);
      return { projects };
    }
    // const res = await fetch(`${host}/queryStudies`);
    // if (res.ok === true) {
    //   const json = await res.json();
    //   // console.log('json', json);
    //   return { projects: [], ...json };
    // }

    // const socket = io(host,  {secure: true });
    // const projects = await new Promise((resolve, reject) => {
    //   socket.emit("queryStudies", {});
    //   socket.on("queryStudies", studies => resolve(studies));
    // });

    return { projects: [] };
  }

  render() {
    const { props: { projects = [] } } = this;

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
        <Nav />
        <ProjectList projects={projects} />
      </div>
    );
  }
}
