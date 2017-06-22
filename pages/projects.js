import React from "react";

import Nav from '../components/nav';
import ProjectList from "../components/projectList";
import styleSheet from "styles/global.scss";

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    const { projects } = query;
    return { projects };
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
