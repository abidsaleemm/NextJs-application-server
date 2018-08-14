import { adapter } from "../server";

export default async ({ action: { teamIds } }) => {
  const { users: { deleteTeams = () => {} } = {} } = adapter;
  
  deleteTeams(teamIds);
};
