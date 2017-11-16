import { setSettings } from "../authUsers";

export default async ({ socket, user: { id } = {}, action }) => {
  setSettings(id, action.action);
};
