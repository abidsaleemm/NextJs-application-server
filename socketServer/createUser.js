import { createUser } from "../authUsers/local";

export default async ({
  socket,
  user: { admin = false, client = false } = {},
  action: { userData }
}) => {
  createUser(userData);
};
