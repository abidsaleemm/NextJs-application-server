import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table
} from "reactstrap";

const RenderRow = ({ patientName, age = "", sex = "" }) => (
  <div className="tableContainer">
    <style jsx>
      {`
        .tableContainer {
          display: flex;
          width: 100%;
        }

        .tablePatientName {
          width: 100%;
          margin: 0.5em;
        }

        .tablePatientAge {
          margin: 0.5em;
        }
      `}
    </style>
    <div className="tablePatientName">{patientName}</div>
    <div className="tablePatientAge">{age}</div>
    <div className="tablePatientAge">{sex}</div>
  </div>
);

export default ({
  label = "Create",
  studyUID,
  projects = [],
  onClick = () => {}
}) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>{label}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => onClick()}>
          <RenderRow patientName="None" age="" />
        </DropdownItem>

        {projects
          .filter(({ hasProjectSnapshots }) => hasProjectSnapshots)
          .map(
            ({
              studyUID: defaultStudyUID,
              patientName,
              patientBirthDate,
              patientSex
            }) => {
              const age =
                new Date().getFullYear() -
                new Date(patientBirthDate).getFullYear();

              return (
                <DropdownItem
                  key={`project-list-${defaultStudyUID}`}
                  onClick={() => onClick(defaultStudyUID)}
                >
                  <RenderRow
                    patientName={patientName}
                    age={age}
                    sex={patientSex}
                  />
                </DropdownItem>
              );
            }
          )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
