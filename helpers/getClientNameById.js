import users from '../auth/users';

export default id => {
    const { 0: client } = users()
        .filter(v => v.id == id) // TODO Handle typing better?
        .map(({ name }) => name);

    return client;
}