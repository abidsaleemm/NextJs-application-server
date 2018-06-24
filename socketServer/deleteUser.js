import { adapter } from "../server";

export default async ({ action: { userId } }) => {
  const { users: { deleteUser = () => {} } = {} } = adapter;

  deleteUser(userId);
};
