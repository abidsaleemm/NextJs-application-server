export default async ({ user: { id = 0, admin = false, client = false } = {} }) =>
    ({ id, admin, client });