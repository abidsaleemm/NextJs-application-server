import { deleteUser } from "../authUsers/local";

export default async ({
  socket,
  user: { admin = false } = {},
  action: { userId }
}) => {
  deleteUser(userId);
};
