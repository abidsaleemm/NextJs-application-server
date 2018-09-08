import React from "react";
import styleBootstrap from "bootstrap/dist/css/bootstrap.css";
import styleWysiwyg from "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// Global styles can go here
const customCSS = `
.modal-xl {
  width: 750px;
}

.editorClassName {
  height: 400px;
  overflow: hidden;
}

.dropdownMenu {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
`;

export default () => (
  <style dangerouslySetInnerHTML={{ __html: styleBootstrap + styleWysiwyg + customCSS }} />
);
