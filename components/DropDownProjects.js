import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import TableList from "./TableList";

const header = () => ({
  statusRender: "Status",
  patientName: "Patient Name",
  patientAge: "Age",
  patientSex: "Gender",
  studyType: "Study Type"
});

//   data={projectsEnhanced}
//           sortKey={sortKey}
//           sortDesc={sortDesc}
//           header={header()}
//           filterFunc={filterFunc(props)}
//           filterRender={filterRender(props)}
//           onSort={k => setProjectsSettings({ sortKey: k })}

// onClick={() => onClick(defaultStudyUID)}
export default ({
  label = "Create",
  projects = [],
  onClick = () => {}
}) => {
  // TODO Create popup with table view componet?
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>{label}</DropdownToggle>
      <DropdownMenu>
        <TableList data={projects} header={header()} />
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
