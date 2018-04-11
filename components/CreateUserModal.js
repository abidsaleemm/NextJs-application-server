import React, { Component } from "react";
import UUID from "uuid-js";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

export class CreateUserModal extends Component {
  constructor(props) {
    super(props);

    const id = UUID.create().toString();
    this.state = { name: "", id, username: "", password: "" };
  }

  onFieldChange = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value
    });
  };

  onSubmit = () => {
    const { name, username, password, id } = this.state;
    this.props.onSubmit({
      name,
      username,
      password,
      id
    });
    this.props.toggle();
  };

  render() {
    const { toggle, onSubmit, isOpen } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="John Doe"
                onChange={this.onFieldChange("name")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">User Name / Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="yourEmail@email.com"
                onChange={this.onFieldChange("username")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="passwordComfirm">Confirm Password</Label>
              <Input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="re-type password"
                onChange={this.onFieldChange("password")}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{" "}
          <Button color="primary" onClick={this.onSubmit}>
            Create User
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CreateUserModal;
