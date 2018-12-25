export default async ({ action: { teamData }, adapter }) => {
  const { users: { createTeam = () => {} } = {} } = adapter;

  createTeam(teamData);
};
