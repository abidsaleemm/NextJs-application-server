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
  InputGroup,
  Label,
  Alert,
  Input
} from "reactstrap";
import * as actions from "../actions";
import { isRequired, isEmail } from "../helpers/validate";

export class EditUserModal extends Component {
  static async getInitialProps({
    store,
    isServer,
    query: { users = [] }
  }) {
    const { payloadUsers } = actions;

    if (isServer) {
      //TODO Should we wrap these in a single action?
      store.dispatch(payloadUsers({ data: users }));
      return;
    }
    store.dispatch({ type: "server/pageUsers" });
  }

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

    this.teams = [
      {
        id: "Team1",
        title: "Team1",
        isTeamAdmin: false
      },
      {
        id: "Team2",
        title: "Team2",
        isTeamAdmin: false
      },
      {
        id: "Team3",
        title: "Team3",
        isTeamAdmin: false
      },
      {
        id: "Team4",
        title: "Team4",
        isTeamAdmin: false
      },
      {
        id: "Team5",
        title: "Team5",
        isTeamAdmin: false
      }
    ];

  }

  componentWillReceiveProps({ user, teams , loginUser}) {
    let vTeam = (loginUser.role === "admin") ? this.teams : loginUser.teams.filter(_team => _team.isTeamAdmin === true);
    const teamsWithStatus = vTeam.map(team => ({
      ...team,
      isSelected: Array.isArray(user.teams) && ( user.teams.filter(_team => _team.title === team.title).length > 0), 
    }));

    this.setState({ ...this.state,...user, teamsWithStatus, confirmPassword: "" });
  }

  handleClick = index => () => {
    const { teamsWithStatus } = this.state;
    teamsWithStatus[index].isSelected = !teamsWithStatus[index]
      .isSelected;

    this.setState({
      ...this.state,
      teamsWithStatus
    });
  };

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
    const { name, username, password, role, id, teams, teamsWithStatus } = this.state;
    const { toggle, onSubmit } = this.props;

    let selectedItems;

    if( this.props.loginUser.role === "user" && this.props.loginUser.teams.filter( team => team.isTeamAdmin === true).length > 0)
    { 
      selectedItems = teams.map(team => {
        const selectedItem = teamsWithStatus.find(
          selected => selected.id === team.id
        );
        
        return selectedItem && selectedItem.isSelected
          ? (({ isSelected, ...others }) => others)(selectedItem)
          : team;
      });

      console.log("selectedItems----",selectedItems);
    } else  {
      selectedItems = teamsWithStatus
      .filter(team => team.isSelected === true)
      .map(({ id, title, isTeamAdmin }) => ({
        id,
        title,
        isTeamAdmin
      }));
    }
    onSubmit({
      name,
      username,
      password,
      id,
      role,
      teams: selectedItems
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
    const { id, teamsWithStatus } = this.state;

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
                      className={`toggle-Item ${
                        item.isSelected
                          ? "toggle-Item-clicked"
                          : "toggle-off"
                      }`}
                      onClick={this.handleClick(index)}
                    >
                      {item.title}
                    </div>
                  ))}
              </div>
            </InputGroup>
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
