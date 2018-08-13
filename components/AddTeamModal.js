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

export class AddTeamModal extends Component {
  constructor(props) {
    super(props);
    const { user } = props;

    this.state = {
      ...user
    };
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

  onSubmit = () => {
    const {
      id,
      name,
      username,
      password,
      role,
      teamsWithStatus
    } = this.state;
    const { toggle, onSubmit } = this.props;

    const selectedItems = teamsWithStatus
      .filter(team => team.isSelected === true)
      .map(({ id, title, isTeamAdmin }) => ({
        id,
        title,
        isTeamAdmin
      }));
    onSubmit({
      id,
      name,
      username,
      password,
      role,
      teams: selectedItems
    });
    toggle();
  };

  componentWillReceiveProps({ user, teams }) {
    // todo: this.teams should be replaced with props.teams
    const teamsWithStatus = teams && teams.map(team => ({
        ...team,
        isSelected:
        Array.isArray(user.teams) && (user.teams.filter(_team => _team.title === team.title).length > 0), 
    }));

    this.setState({
      ...this.state,
      ...user,
      teamsWithStatus
    });
  }

  render() {
    const { toggle, onSubmit, isOpen } = this.props;
    const { id, teamsWithStatus } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Assign Teams</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{" "}
          <Button color="primary" onClick={this.onSubmit}>
            Assign Teams
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
)(AddTeamModal);
