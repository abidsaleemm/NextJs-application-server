export default async ({ action: { teamIds }, adapter }) => {
  const { users: { deleteTeams = () => {} } = {} } = adapter;
  
  deleteTeams(teamIds);
};
