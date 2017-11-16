import { setUserProps } from "../authUsers";

export default async ({ socket, user: { id } = {}, action }) => {
  setUserProps(id, action.action);
};
