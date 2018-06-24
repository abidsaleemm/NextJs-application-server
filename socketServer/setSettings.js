import { adapter } from "../server";

export default async ({ user: { id } = {}, action }) => {
  const { users: { setUserProps = () => {} } = {} } = adapter;

  setUserProps(id, action.action);
};
