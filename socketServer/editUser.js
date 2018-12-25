export default async ({ action: { userData }, adapter }) => {
  const { users: { editUser = () => {} } = {} } = adapter;
  editUser(userData);
};
