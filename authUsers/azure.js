import azure from 'azure-storage';
import bcrypt from 'bcryptjs';
import queryTable from '../helpers/azure/queryTable';

// TODO This is pretty reusable.  Propose moving to azure helpers.  
// Is already used in multiple places for each adapter
const tableService = azure.createTableService(
    process.env.STORAGE,
    process.env.STORAGE_KEY
);

const tableName = 'users';

export const getUser = async ({ username, password }) => {
    const query = new azure.TableQuery().where('PartitionKey eq ?', username);
    const { 0: { password: passwordCheck, ...user } = {} } = 
        await queryTable({ tableService, query, tableName });
    const res = await bcrypt.compare(password, passwordCheck);

    return res === true ? user : false;
}

export const getClients = async () => 
    await queryTable({ 
        tableService, 
        query: new azure.TableQuery().where("client eq ?", true), 
        tableName 
    });
