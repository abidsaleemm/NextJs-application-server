export default async ({ action: { userData }, adapter }) => {
  const { users: { createUser = () => {} } = {} } = adapter;

  createUser(userData);
};
