import React from "react";
import styleBootstrap from "bootstrap/dist/css/bootstrap.css";
import styleWysiwyg from "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// Global styles can go here
export default () => (
  <style dangerouslySetInnerHTML={{ __html: styleBootstrap + styleWysiwyg }} />
);
