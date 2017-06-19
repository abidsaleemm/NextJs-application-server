import React from "react";
import Link from "next/link";

// import io from 'socket.io-client';
import ProjectList from "../components/projectList";
import styleSheet from "styles/global.scss";

export default class extends React.Component {

  render() {
    const { state = {} } = this;

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
        <ProjectList />
      </div>
    );
  }
}
