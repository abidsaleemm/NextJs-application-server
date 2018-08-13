import React, { Component } from "react";
import UUID from "uuid-js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup
} from "reactstrap";
import * as actions from "../actions";
import { isRequired, isEmail } from "../helpers/validate";

export class CreateTeamModal extends Component {
  constructor(props) {
    super(props);
    const id = UUID.create().toString();
    this.state = {
      name: "",
      id,
      nameValid: ""
    };
  }

  onFieldChange = fieldName => e => {
    const name = e.target.name;
    const value = e.target.value;
    this.formValidate(name, value);
    this.setState({
      [fieldName]: e.target.value
    });
  };

  formValidate = (name, value) => {
    name === "name" && this.setState({ nameValid: isRequired(value) });
  };

  onSubmit = () => {
    const id = UUID.create().toString();
    const { onSubmit, toggle } = this.props;
    const { name } = this.state;

    this.formValidate("name", name);

    if (!this.state.nameValid) {
      onSubmit({
        id,
        title: name,
        isTeamAdmin: false
      });
      toggle();
    }
  };

  render() {
    const { toggle, isOpen } = this.props;
    const { id } = this.state;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Team</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="name" name="name" id="name" placeholder="Team..." onChange={this.onFieldChange("name")} />
              <Alert color="danger" isOpen={!!this.state.nameValid}>
                {this.state.nameValid}
              </Alert>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{" "}
          <Button
            color="primary"
            onClick={this.onSubmit}
            disabled={!!this.state.nameValid}
          >
            Create Team
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ userList }) => ({ userList });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTeamModal);
