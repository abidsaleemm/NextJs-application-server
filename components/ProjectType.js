import React from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

export default ({ admin = true, type = "", onChange = () => {} }) => {
  return admin ? (
    <UncontrolledDropdown>
      <DropdownToggle caret>{type}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => onChange("Live")}>Live</DropdownItem>
        <DropdownItem onClick={() => onChange("Sample")}>Sample</DropdownItem>
        <DropdownItem onClick={() => onChange("Training")}>
          Training
        </DropdownItem>
        <DropdownItem onClick={() => onChange("Removed")}>Removed</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  ) : (
    <div>{type}</div>
  );
};
