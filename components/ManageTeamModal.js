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
import { isRequired } from "../helpers/validate";
import { CREATE_TEAM_STRING, DELETE_TEAM_STRING } from "../constants/strings";

export class CreateTeamModal extends Component {
  constructor(props) {
    super(props);
    const id = UUID.create().toString();
    this.state = {
      name: "",
      id,
      nameValid: "",
      submitTitle: CREATE_TEAM_STRING
    };
  }

  componentWillReceiveProps({ teams }) {
    const teamsWithStatus = teams.map(team => ({
      ...team,
      isSelected: false
    }));

    this.setState({
      ...this.state,
      teamsWithStatus,
      filteredTeamStatus: teamsWithStatus,
      submitTitle: CREATE_TEAM_STRING
    });
  }

  handleClick = index => () => {
    const { filteredTeamStatus } = this.state;
    filteredTeamStatus[index].isSelected = !filteredTeamStatus[index].isSelected;
    let submitTitle =
      filteredTeamStatus.filter(team => team.isSelected === true).length > 0 ? DELETE_TEAM_STRING : CREATE_TEAM_STRING;
    this.setState({
      ...this.state,
      filteredTeamStatus,
      submitTitle
    });
  };

  onFieldChange = fieldName => e => {
    const name = e.target.name;
    const value = e.target.value;
    this.formValidate(name, value);
    const { teamsWithStatus } = this.state;
    const filteredTeamStatus = teamsWithStatus.filter(teamInfo => teamInfo.title.includes(value));
    if (filteredTeamStatus.filter(teamInfo => teamInfo.isSelected === true).length > 0)
      this.setState({ nameValid: "" });
    this.setState({
      [fieldName]: e.target.value,
      filteredTeamStatus
    });
  };

  formValidate = (name, value) => {
    name === "name" && this.setState({ nameValid: isRequired(value) });
  };

  onSubmit = () => {
    const id = UUID.create().toString();
    const { onSubmit, toggle } = this.props;
    const { name, filteredTeamStatus } = this.state;

    this.formValidate("name", name);

    this.setState({
      nameValid: this.state.submitTitle === DELETE_TEAM_STRING ? "" : this.state.nameValid
    });

    if (!this.state.nameValid && this.state.submitTitle === CREATE_TEAM_STRING) {
      onSubmit({
        id,
        title: name,
        isTeamAdmin: false
      });
    } else {
      const teamIds = filteredTeamStatus && filteredTeamStatus.filter(status => status.isSelected).map(team => team.id);
      this.props.deleteTeams(teamIds);
    }
    toggle();
  };

  render() {
    const { toggle, isOpen } = this.props;
    const { id, filteredTeamStatus, submitTitle } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Manage Teams</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="name" name="name" id="name" placeholder="Team..." onChange={this.onFieldChange("name")} />
              <Alert color="danger" isOpen={!!this.state.nameValid}>
                {this.state.nameValid}
              </Alert>
            </FormGroup>
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
                {filteredTeamStatus &&
                  filteredTeamStatus.map((item, index) => (
                    <div
                      key={`editUser${id}_team_${index}`}
                      className={`toggle-Item ${item.isSelected ? "toggle-Item-clicked" : "toggle-off"}`}
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
          <Button color="primary" onClick={this.onSubmit} disabled={!!this.state.nameValid}>
            {submitTitle}
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
