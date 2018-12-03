export default async ({ user: { id } = {}, action, adapter }) => {
  const { users: { setUserProps = () => {} } = {} } = adapter;

  setUserProps(id, action.action);
};
