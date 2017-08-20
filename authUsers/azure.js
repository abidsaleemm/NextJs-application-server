import azure from 'azure-storage';
import bcrypt from 'bcrypt';
import queryTable from '../helpers/azure/queryTable';

// TODO This is pretty reusable.  Propose moving to azure helpers.  
// Is already used in multiple places for each adapter
const tableService = azure.createTableService(
    process.env.STORAGE,
    process.env.STORAGE_KEY
);

const tableName = 'users';

export default ({ username, password }) => {
    let query = new azure.TableQuery().where('PartitionKey eq ?', username);
    queryTable({ tableService, query, tableName }).then((response) => {
        bcrypt.compare(password, response['0'].password, (err, res)  => {
            // return res === true ? 
            if (res === true) {
                const { PartitionKey, RowKey, Timestamp, password, '.metadata': undefined, ...user } = response['0'];
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }).catch(error => {
        console.log(error);
        throw new Error(error);
    });
}

export const getClients = () => {
//   users
//     .filter(({ client }) => client !== undefined)
//     .map(({ id, name }) => ({ id, name }));

    return [];
};

// export const getUser = ({ username, password }) =>
//     users.find(user =>
//         user.username === username && user.password === password)
        
// export const getClients = () => {
//   users
//     .filter(({ client }) => client !== undefined)
//     .map(({ id, name }) => ({ id, name }));
// };