import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export class CreateUserModal extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = { ...user, confirmPassword: "" };
  }

  componentWillReceiveProps({ user }) {
    this.setState({ ...user, confirmPassword: "" });
  }

  onFieldChange = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value
    });
  };

  onSubmit = () => {
    const { name, username, password, id } = this.state;
    const { toggle, onSubmit } = this.props;
    onSubmit({
      name,
      username,
      password,
      id
    });
    toggle();
  };

  renderConfirmPassword = () => {
    const { password: statePassword } = this.state;
    const {
      user: { password: propsPassword }
    } = this.props;

    return propsPassword !== statePassword ? (
      <FormGroup>
        <Label for="passwordComfirm">Confirm Password</Label>
        <Input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="re-type password"
          value={this.state.confirmPassword}
          onChange={this.onFieldChange("confirmPassword")}
        />
      </FormGroup>
    ) : null;
  };
  render() {
    const { toggle, onSubmit, isOpen } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="John Doe"
                value={this.state.name}
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
                value={this.state.username}
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
                value={this.state.password}
                onChange={this.onFieldChange("password")}
              />
            </FormGroup>
            {this.renderConfirmPassword()}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{" "}
          <Button color="primary" onClick={this.onSubmit}>
            Edit User
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CreateUserModal;
