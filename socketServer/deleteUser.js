export default async ({ action: { userId }, adapter}) => {
  const { users: { deleteUser = () => {} } = {} } = adapter;

  deleteUser(userId);
};
