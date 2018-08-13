import { adapter } from "../server";
import { payloadTeams } from "../actions";

export default async ({ action: { teamData } }) => {
  const { users: { createTeam = () => {}, getTeams = () => {} } = {} } = adapter;

  createTeam(teamData);
};
