import React from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import getStatusName from "../helpers/getStatusName";

export default ({ status, studyUID, setProjectProps = () => {} }) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>{getStatusName(status)}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: 1
            })
          }
        >
          {getStatusName(1)}
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: 2
            })
          }
        >
          {getStatusName(2)}
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: 3
            })
          }
        >
          {getStatusName(3)}
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: 4
            })
          }
        >
          {getStatusName(4)}
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: 5
            })
          }
        >
          {getStatusName(5)}
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: 6
            })
          }
        >
          {getStatusName(6)}
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: 7
            })
          }
        >
          {getStatusName(7)}
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
