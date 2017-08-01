import React from "react";
import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';

export default class extends React.Component {

componentDidMount() {
    var parent = window.opener;
    parent.location ='/projects';
    window.close();
  }

  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styleBootstrap }} />

        <div> <h3>login successfull.</h3> <span>redirecting to projects...</span> </div>
      </div>
    );
  }
}
