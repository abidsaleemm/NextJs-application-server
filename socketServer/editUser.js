import { adapter } from "../server";

export default async ({ action: { userData } }) => {
  const { users: { editUser = () => {} } = {} } = adapter;
  editUser(userData);
};
