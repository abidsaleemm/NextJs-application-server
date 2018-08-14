import { adapter } from "../server";

export default async ({ action: { teamData } }) => {
  const { users: { createTeam = () => {} } = {} } = adapter;

  createTeam(teamData);
};
