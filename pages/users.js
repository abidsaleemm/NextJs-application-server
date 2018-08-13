import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";
import EditIcon from "react-icons/lib/md/edit";
import DeleteIcon from "react-icons/lib/md/delete";
import AddIcon from "react-icons/lib/md/add";
import ReactDOM from "react-dom";
import Wrapper from "../hoc/wrapper";
import * as actions from "../actions";
import MediaCardIdentity from "../components/MediaCardIdentity";
import MediaCardHeader from "../components/MediaCardHeader";
import MediaCardContent from "../components/MediaCardContent";
import ActionGroup from "../components/ActionGroup";
import IconButton from "../components/IconButton";
import MediaCardGroup from "../components/MediaCardGroup";
import MediaCard from "../components/MediaCard";
import CreateUserModal from "../components/CreateUserModal";
import EditUserModal from "../components/EditUserModal";
import DeleteUserModal from "../components/DeleteUserModal";
import DropDownButton from "../components/DropDownButton";
import CreateTeamModal from "../components/CreateTeamModal";
import _ from "underscore";
import TeamButton, { TEAM_ACTION_OPTIONS } from "../components/TeamButton";

class Users extends Component {
  static async getInitialProps({ store, isServer, query: { users = [], teams = [] } }) {
    const { payloadUsers, payloadTeams } = actions;

    console.log("---users----", users, "----teams---");
    if (isServer) {
      //TODO Should we wrap these in a single action?
      store.dispatch(payloadUsers({ data: users }));
      store.dispatch(payloadTeams({ data: teams }));
      return;
    }

    store.dispatch({ type: "server/pageUsers" });
  }

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      createUserModal: false,
      editUserModal: false,
      deleteUserModal: false,
      createTeamModal: false
    };
  }

  toggleCreateUserModal = () => {
    const { createUserModal } = this.state;
    this.setState({
      createUserModal: !createUserModal
    });
  };

  toggleCreateTeamModal = () => {
    const { createTeamModal } = this.state;
    this.setState({
      createTeamModal: !createTeamModal
    });
  };

  toggleEditUserModal = user => {
    const { editUserModal, currentUser } = this.state;
    this.setState({
      currentUser: editUserModal ? currentUser : user,
      editUserModal: !editUserModal
    });
  };

  onDeleteClick = user => {
    const { deleteUserModal, currentUser } = this.state;
    this.setState({
      currentUser: deleteUserModal ? currentUser : user,
      deleteUserModal: !deleteUserModal
    });
    // this.props.deleteUser(value);
  };
  
  onRoleUpdated = (user, item) => {
    user.role = item;
    this.props.editUser(user);
  };

  isRelated = user => {
    if (this.props.user.role === "admin") return true;
    const currentUserAllTeamId = user.teams && user.teams.map(team => team.id);
    const loginUserAllTeamId = this.props.user.teams && this.props.user.teams.map(team => team.id);
    const found = _.intersection(currentUserAllTeamId, loginUserAllTeamId).length ? true : false;
    return found;
  };

  updateUserTeam = (user, option, team) => {
    switch (option) {
      case TEAM_ACTION_OPTIONS.REMOVE_FROM_TEAM:
        user.teams.isTeamAdmin = false;
        user.teams = user.teams.filter(_team => _team.id !== team.id);
        this.props.editUser(user);
        break;
      case TEAM_ACTION_OPTIONS.ASSIGN_TEAM_ADMIN:
        user.teams.filter(_team => _team.id === team.id).map(_team => (_team.isTeamAdmin = true));
        this.props.editUser(user);
        break;
      case TEAM_ACTION_OPTIONS.REMOVE_TEAM_ADMIN:
        user.teams.filter(_team => _team.id === team.id).map(_team => (_team.isTeamAdmin = false));
        this.props.editUser(user);
        break;
      default:
        break;
    }
  };

  render() {
    const {
      deleteUser,
      createUser,
      createTeam,
      editUser,
      user,
      userList: { data, fetching },
      teamList: { data: teams }
    } = this.props;

    console.log("user", user);

    return (
      <div className="root">
        <style jsx>{`
          .root {
            background: #eceeef;
          }
        `}</style>
        <MediaCardHeader>
          <MediaCardIdentity>Name</MediaCardIdentity>
          <MediaCardContent>Email/User Name</MediaCardContent>
          {this.props.user.role === "admin" && <MediaCardContent>Role</MediaCardContent>}
          <MediaCardContent>Team</MediaCardContent>
          <ActionGroup shown={this.props.user.role === "admin"}>
            <Button onClick={this.toggleCreateTeamModal} color="primary" size="sm">
              Create Team
            </Button>
          </ActionGroup>
          <ActionGroup
            shown={
              this.props.user.role === "admin" || this.props.user.teams.filter(user => user.isTeamAdmin === true).length
            }
          >
            <Button onClick={this.toggleCreateUserModal} color="primary" size="sm">
              Create User
            </Button>
          </ActionGroup>
        </MediaCardHeader>
        <MediaCardGroup>
          {data.map(
            user =>
              this.isRelated(user) && (
                <MediaCard key={user.id}>
                  <MediaCardIdentity>{user.name}</MediaCardIdentity>
                  <MediaCardContent>{user.username}</MediaCardContent>
                  {this.props.user.role === "admin" && (
                    <MediaCardContent>
                      <DropDownButton
                        keyValue={user.id}
                        items={["admin", "user"]}
                        defaultItem={user.role}
                        onItemSelected={item => this.onRoleUpdated(user, item)}
                      />
                    </MediaCardContent>
                  )}
                  <MediaCardContent>
                    {Array.isArray(user.teams) &&
                      user.teams.map((item, index) => (
                        <TeamButton
                          key={"dropdown" + user.id + "item" + index}
                          keyValue={"team" + user.id + "item" + index}
                          currentUser={this.props.user}
                          team={item}
                          onOptionSelected={(option, team) => this.updateUserTeam(user, option, team)}
                        />
                      ))}
                  </MediaCardContent>
                  <ActionGroup
                    shown={
                      this.props.user.role === "admin" ||
                      this.props.user.teams.filter(user => user.isTeamAdmin === true).length
                    }
                  >
                    <IconButton onClick={() => this.toggleEditUserModal(user)}>
                      <EditIcon size="25px" />
                    </IconButton>
                    <IconButton onClick={() => this.onDeleteClick(user)}>
                      <DeleteIcon size="25px" />
                    </IconButton>
                  </ActionGroup>
                </MediaCard>
              )
          )}
        </MediaCardGroup>
        <CreateUserModal
          onSubmit={createUser}
          teams={teams}
          loginUser={this.props.user}
          isOpen={this.state.createUserModal}
          toggle={this.toggleCreateUserModal}
        />
        <CreateTeamModal
          onSubmit={createTeam}
          teams={teams}
          isOpen={this.state.createTeamModal}
          toggle={this.toggleCreateTeamModal}
        />
        <EditUserModal
          user={this.state.currentUser}
          teams={teams}
          loginUser={this.props.user}
          onSubmit={editUser}
          isOpen={this.state.editUserModal}
          toggle={this.toggleEditUserModal}
        />
        <DeleteUserModal
          user={this.state.currentUser}
          onSubmit={deleteUser}
          isOpen={this.state.deleteUserModal}
          toggle={this.onDeleteClick}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user, userList, teamList }) => ({ user, userList, teamList });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper(Users));
