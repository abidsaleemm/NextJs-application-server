export default async ({ action: { userId } }) => {
  const { users: { deleteUser = () => {} } = {} } = adapter;

  deleteUser(userId);
};
