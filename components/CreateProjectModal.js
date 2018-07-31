import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import TableList from "./TableList";

const header = () => ({
  status: "Status",
  sampleRender: "Sample",
  patientName: "Patient Name",
  patientAge: "Age",
  patientSex: "Gender",
  studyType: "Study Type"
});

const strSort = (a = "", b = "") => {
  const strA = `${a}`.toUpperCase();
  const strB = `${b}`.toUpperCase();

  if (strA < strB) {
    return -1;
  }

  if (strA > strB) {
    return 1;
  }

  return 0;
};

const sortFunc = () => ({
  status: ({ status: a = "" }, { status: b = "" }) => strSort(a, b),
  patientName: ({ patientName: a }, { patientName: b }) =>
    strSort(a, b),
  patientAge: ({ patientAge: a }, { patientAge: b }) => {
    const testA = parseInt(a);
    const testB = parseInt(b);

    return (isNaN(testA) ? 0 : testA) - (isNaN(testB) ? 0 : testB);
  },
  patientSex: ({ patientSex: a }, { patientSex: b }) => strSort(a, b),
  studyType: ({ studyType: a }, { studyType: b }) => strSort(a, b)
});

export default ({
  isOpen,
  projects = [],
  sortKey = "",
  sortDesc = false,
  onSort = () => {},
  toggle = () => {},
  onRowClick = () => {}
}) => {
  const projectsEnhanced = projects.map(
    ({ patientBirthDate = new Date(), sample = false, ...v }) => {
      return {
        ...v,
        patientAge:
          new Date().getFullYear() -
          new Date(patientBirthDate).getFullYear(),
        sampleRender: sample ? "X" : null
      };
    }
  );

  console.log("sortKey", sortKey, sortDesc);

  return (
    <Modal
      style={{ maxWidth: "80%" }}
      isOpen={isOpen}
      toggle={toggle}
    >
      <style jsx>
        {`
          @media (class: .projectsmodal) {
            .modal-dialog {
              max-width: 80%;
            }
          }
        `}
      </style>
      <ModalHeader toggle={toggle}>Create Project</ModalHeader>
      <ModalBody>
        <TableList
          data={projectsEnhanced}
          header={header()}
          sortFunc={sortFunc()}
          sortKey={sortKey}
          sortDesc={sortDesc}
          onSort={onSort}
          onRowClick={onRowClick}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};