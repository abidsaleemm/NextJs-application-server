import React from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

export default ({
  status = "None",
  studyUID,
  role = "",
  setProjectProps = () => {}
}) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>{status}</DropdownToggle>
      <DropdownMenu>
        {role === "admin" ? (
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
        ) : null}
        <DropdownItem
          onClick={() =>
            setProjectProps({
              studyUID,
              status: "Start"
            })
          }
        >
          Start
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
              status: "QC"
            })
          }
        >
          QC
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
        {role === "admin" ? (
          <div>
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
            <DropdownItem
              onClick={() =>
                setProjectProps({
                  studyUID,
                  status: "Archived"
                })
              }
            >
              Archived
            </DropdownItem>
          </div>
        ) : null}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
