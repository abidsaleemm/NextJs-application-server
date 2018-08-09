import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

export const TEAM_ACTION_OPTIONS = {
  REMOVE_FROM_TEAM: "Remove from team",
  ASSIGN_TEAM_ADMIN: "Assign as team admin",
  REMOVE_TEAM_ADMIN: "Unassign team admin role"
};

const getSettingItems = (currentUser, team) => {
  const { role } = currentUser;

  let isCurrentUserTeamAdmin = false;
  let isSameTeam = false;
  if (currentUser.teams) {
    const currentUserTeam = currentUser.teams.find(
      item => item.id === team.id
    );
    isCurrentUserTeamAdmin =
      currentUserTeam && currentUserTeam.isTeamAdmin;
    isSameTeam = currentUserTeam ? true : false;

  }

  if (role === "admin") {
    return [
      team.isTeamAdmin
        ? TEAM_ACTION_OPTIONS.REMOVE_TEAM_ADMIN
        : TEAM_ACTION_OPTIONS.ASSIGN_TEAM_ADMIN,
        TEAM_ACTION_OPTIONS.REMOVE_FROM_TEAM
    ];
  }


  if (isCurrentUserTeamAdmin) {
    return [TEAM_ACTION_OPTIONS.REMOVE_FROM_TEAM];
  }
};

const renderTeam = team => {
  if (team.isTeamAdmin) {
    return (
      <div>
        {team.title} Admin
      </div>
    );
  } else {
    return team.title;
  }
};

const renderNormal = (team) => {
  return (
      <Button>{renderTeam(team)}</Button>
  );
};

const renderWithOptions = ( teamSettingOptions, team, keyValue, onOptionSelected) => {
  return (
    <UncontrolledDropdown>
      <style jsx>
        {`
          .renderOption {
            display: flex;
            background: green;
            justify-content: space-between;
            cursor: pointer;
          }
          div.dropdown {
            padding-bottom: 10px;
          }
        `}
      </style>
      <DropdownToggle caret>{renderTeam(team)}</DropdownToggle>
      <DropdownMenu>
        {teamSettingOptions.map((option, index) => (
          <DropdownItem
            key={keyValue + index}
            onClick={() => onOptionSelected(option, team)}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};


const renderTeamSettings = (
  keyValue,
  currentUser,
  team,
  onOptionSelected
) => {
  const teamSettingOptions = getSettingItems(currentUser, team);
  if (teamSettingOptions && teamSettingOptions.length > 0) {
    return renderWithOptions(teamSettingOptions, team, keyValue, onOptionSelected);
  } else {
    return renderNormal(team);
  }
};

// TODO should this be in another location?
export default ({
  currentUser,
  team,
  keyValue,
  onOptionSelected
}) => {
  return renderTeamSettings( keyValue, currentUser, team, onOptionSelected);
};
