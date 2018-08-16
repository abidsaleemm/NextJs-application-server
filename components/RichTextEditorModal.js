import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import * as actions from "../actions";

export class RichTextEditorModal extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit() {
    
  }

  render() {
    const { toggle, isOpen } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirm</ModalHeader>
        <ModalBody>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{" "}
          <Button color="primary" onClick={this.onSubmit}>
            Ok
          </Button>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = ({ userList }) => ({ userList });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RichTextEditorModal);
