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
  Input
} from "reactstrap";
import * as actions from "../actions";
import { isRequired, isEmail } from "../helpers/validate";

export class CreateUserModal extends Component {
  constructor(props) {
    super(props);
    const id = UUID.create().toString();
    this.state = {
      name: "",
      id,
      username: "",
      password: "",
      confirmPassword: "",
      nameValid: "",
      emailValid: "",
      passwordValid: ""
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
    name === "name" &&
      this.setState({ nameValid: isRequired(value) });
    name === "email" && this.setState({ emailValid: isEmail(value) });
    name === "password" &&
      this.setState({ passwordValid: isRequired(value) });
    name === "passwordConfirm" &&
      this.setState({ passwordValid: isRequired(value) });
    this.isPasswordMatched(name, value);
    return (
      !!this.state.nameValid ||
      !!this.state.emailValid ||
      !!this.state.passwordValid
    );
  };

  isPasswordMatched = (name, value) => {
    if (name === "password") {
      if (value !== this.state.confirmPassword)
        this.setState({ passwordValid: "Password is not matched" });
    } else if (name === "passwordConfirm") {
      if (value !== this.state.password)
        this.setState({ passwordValid: "Password is not matched" });
    }
  };

  onSubmit = () => {
    const id = UUID.create().toString();
    const { onSubmit, toggle } = this.props;
    const { name, username, password, role = "user" } = this.state;
    if (!!name && !!username && !!password) {
      onSubmit({
        name,
        username,
        password,
        id,
        role
      });
      toggle();
    }
  };

  render() {
    const { toggle, isOpen } = this.props;
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
              <Alert color="danger" isOpen={!!this.state.nameValid}>
                {this.state.nameValid}
              </Alert>
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
              <Alert color="danger" isOpen={!!this.state.emailValid}>
                {this.state.emailValid}
              </Alert>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={this.onFieldChange("password")}
                value={this.state.password}
              />
              <Alert
                color="danger"
                isOpen={!!this.state.passwordValid}
              >
                {this.state.passwordValid}
              </Alert>
            </FormGroup>
            <FormGroup>
              <Label for="passwordComfirm">Confirm Password</Label>
              <Input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="re-type password"
                onChange={this.onFieldChange("confirmPassword")}
                value={this.state.confirmPassword}
              />
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
            disabled={
              !!this.state.nameValid ||
              !!this.state.emailValid ||
              !!this.state.passwordValid
            }
          >
            Create User
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ userList }) => ({ userList });

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserModal);
