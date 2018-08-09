import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Alert,
  Input
} from "reactstrap";
import * as actions from "../actions";
import { isRequired, isEmail } from "../helpers/validate";

export class EditUserModal extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      ...user,
      confirmPassword: "",
      nameValid: "",
      emailValid: "",
      passwordValid: ""
    };
  }

  componentWillReceiveProps({ user }) {
    this.setState({ ...user, confirmPassword: "" });
  }

  onFieldChange = fieldName => e => {
    const name = e.target.name;
    const value = e.target.value;
    name === "name" && (this.setState({nameValid: isRequired(value)}));
    name === "email" && (this.setState({emailValid: isEmail(value)}));
    name === "password" && (this.setState({passwordValid: isRequired(value)}));
    name === "passwordConfirm" && (this.setState({passwordValid: isRequired(value)}));
    this.isPasswordMatched(name, value);
    this.setState({
      [fieldName]: e.target.value
    });
  };

  isPasswordMatched = (name, value) => {
    if (name === "password") {
      if (value !== this.state.confirmPassword)
        this.setState({passwordValid: "Password is not matched"});
    } else if (name === "passwordConfirm"){
      if (value !== this.state.password)
        this.setState({passwordValid: "Password is not matched"});
    }
  };

  onSubmit = () => {
    const { name, username, password, role, id } = this.state;
    const { toggle, onSubmit } = this.props;
    onSubmit({
      name,
      username,
      password,
      id,
      role
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
                value={this.state.username}
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
                value={this.state.password}
                onChange={this.onFieldChange("password")}
              />
              <Alert
                color="danger"
                isOpen={!!this.state.passwordValid}
              >
                {this.state.passwordValid}
              </Alert>
            </FormGroup>
            {this.renderConfirmPassword()}
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
            Edit User
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
)(EditUserModal);
