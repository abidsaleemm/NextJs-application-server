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
  statusRender: "Status",
  patientName: "Patient Name",
  patientAge: "Age",
  patientSex: "Gender",
  studyType: "Study Type"
});

/*
<DropDownProjects
                studyUID={studyUID}
                projects={self}
                onClick={defaultStudyUID => {
                  createProject({ studyUID, defaultStudyUID });
                }}
              />
              */
//className={this.props.className}

export default ({ isOpen, toggle = () => {} }) => {
  // TODO Enhance the projects table
  const projects = [];

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={this.toggle}>Create Project</ModalHeader>
        <ModalBody>
          <TableList data={projects} header={header()} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
