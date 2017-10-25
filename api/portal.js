import queryPortal from '../query/portal';

export default async ({ user: { id: clientID = 0, admin =  false }}) => await queryPortal({ clientID, admin })
