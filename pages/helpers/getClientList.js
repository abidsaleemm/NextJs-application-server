import users from '../../auth/users';

export default () => users()
    .filter(({ client }) => client !== undefined)
    .map(({ id, name }) => ({ id, name }));

