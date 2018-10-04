import React from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

export default ({ studyType, onChange = () => {} }) => (
  <UncontrolledDropdown>
    <DropdownToggle caret>{studyType ? studyType : "All"}</DropdownToggle>
    <DropdownMenu>
      <DropdownItem onClick={() => onChange()}>All</DropdownItem>

      <DropdownItem onClick={() => onChange("Cervical")}>Cervical</DropdownItem>
      <DropdownItem onClick={() => onChange("Thoracic")}>Thoracic</DropdownItem>
      <DropdownItem onClick={() => onChange("Lumbar")}>Lumbar</DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);
