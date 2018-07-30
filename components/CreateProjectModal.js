import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

/*
<DropDownProjects
                studyUID={studyUID}
                projects={self}
                onClick={defaultStudyUID => {
                  createProject({ studyUID, defaultStudyUID });
                }}
              />
              */

class CreateProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { isOpen } = this.props;

    return (
      <div>
        <Modal
          isOpen={isOpen}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Create Project
          </ModalHeader>
          <ModalBody>
            <DropDownProjects
              studyUID={studyUID}
              projects={self}
              onClick={defaultStudyUID => {
                createProject({ studyUID, defaultStudyUID });
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateProjectModal;

/*
<Button color="danger" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        */
