import { adapter } from "../server";

export default async ({ action: { userData } }) => {
  const { users: { createUser = () => {} } = {} } = adapter;

  createUser(userData);
};
