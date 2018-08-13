import React from "react";
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";

export default ({ status = "None", studyUID, setProjectProps = () => {} }) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>{status}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: "None"
            })
          }
        >
          None
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: "Start"
            })
          }
        >
          Pending
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: "Segmentation"
            })
          }
        >
          Segmentation
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: "Review"
            })
          }
        >
          Review
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: "Done"
            })
          }
        >
          Done
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: "Rendered"
            })
          }
        >
          Rendered
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: "Delivered"
            })
          }
        >
          Delivered
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
