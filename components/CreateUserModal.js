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
      passwordValid: "",
      isExpanded: false
    };

  }

  handleClick = index => () => {
    const { teamsWithStatus } = this.state;
    teamsWithStatus[index].isSelected = !teamsWithStatus[index].isSelected;

    this.setState({
      ...this.state,
      teamsWithStatus
    });
  };

  componentWillReceiveProps({ user, teams, loginUser }) {
    let vTeam =
      loginUser.role === "admin"
        ? teams
        : loginUser.teams
            .filter(_team => _team.isTeamAdmin === true)
            .map(({ id, title, isTeamAdmin }) => ({ id, title, isTeamAdmin: false }));

    const teamsWithStatus = vTeam && vTeam.map(team => ({
      ...team,
      isSelected: false
    }));

    this.setState({ ...this.state, ...user, teamsWithStatus, confirmPassword: "" });
  }

  onFieldChange = fieldName => e => {
    const name = e.target.name;
    const value = e.target.value;
    this.formValidate(name, value);
    this.setState({
      [fieldName]: e.target.value
    });
    if (name == "email") {
      if (this.props.userList.data.filter(user => user.username === value).length > 0)
        this.setState({ isExpanded: false });
      else this.setState({ isExpanded: true });
    }
  };

  formValidate = (name, value) => {
    name === "name" && this.setState({ nameValid: isRequired(value) });
    name === "email" && this.setState({ emailValid: isEmail(value) });
    name === "password" && this.setState({ passwordValid: isRequired(value) });
    name === "passwordConfirm" && this.setState({ passwordValid: isRequired(value) });
    this.isPasswordMatched(name, value);
    return !!this.state.nameValid || !!this.state.emailValid || !!this.state.passwordValid;
  };

  isPasswordMatched = (name, value) => {
    if (name === "password") {
      if (value !== this.state.confirmPassword) this.setState({ passwordValid: "Password is not matched" });
    } else if (name === "passwordConfirm") {
      if (value !== this.state.password) this.setState({ passwordValid: "Password is not matched" });
    }
  };

  onSubmit = () => {
    const id = UUID.create().toString();
    const { onSubmit, toggle } = this.props;
    const { name, username, password, role = "user", teamsWithStatus } = this.state;

    const selectedItems = teamsWithStatus && teamsWithStatus
      .filter(team => team.isSelected === true)
      .map(({ id, title, isTeamAdmin }) => ({
        id,
        title,
        isTeamAdmin
      }));

    if (!!name && !!username && !!password) {
      onSubmit({
        name,
        username,
        password,
        id,
        role,
        teams: selectedItems
      });
      toggle();
    }
  };

  render() {
    const { toggle, isOpen } = this.props;
    const { id, teamsWithStatus } = this.state;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create User</ModalHeader>
        <ModalBody>
          <Form>
            {this.state.isExpanded && (
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="name" name="name" id="name" placeholder="John Doe" onChange={this.onFieldChange("name")} />
                <Alert color="danger" isOpen={!!this.state.nameValid}>
                  {this.state.nameValid}
                </Alert>
              </FormGroup>
            )}
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
            {this.state.isExpanded && (
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
                <Alert color="danger" isOpen={!!this.state.passwordValid}>
                  {this.state.passwordValid}
                </Alert>
              </FormGroup>
            )}
            {this.state.isExpanded && (
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
            )}
            {this.state.isExpanded && (
              <InputGroup>
                <div>
                  <style jsx>
                    {`
                      .toggle-Item {
                        display: inline-block;
                        margin: 10px 15px 10px 0;
                        padding: 5px 15px;
                        background: white;
                        border: 1px solid #6c757d;
                        border-radius: 5px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: 500;
                      }

                      .toggle-Item:hover {
                        cursor: pointer;
                      }

                      .toggle-Item-clicked {
                        background-color: #6c757d;
                        color: white;
                      }

                      .input-group {
                        border-radius: 10px;
                        border: 1px solid red;
                      }
                    `}
                  </style>
                  {teamsWithStatus &&
                    teamsWithStatus.map((item, index) => (
                      <div
                        key={`addTeamModal_${id}_team_${item.id}`}
                        className={`toggle-Item ${item.isSelected ? "toggle-Item-clicked" : "toggle-off"}`}
                        onClick={this.handleClick(index)}
                      >
                        {item.title}
                      </div>
                    ))}
                </div>
              </InputGroup>
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{" "}
          <Button
            color="primary"
            onClick={this.onSubmit}
            disabled={!!this.state.nameValid || !!this.state.emailValid || !!this.state.passwordValid}
          >
            Create User
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
)(CreateUserModal);
