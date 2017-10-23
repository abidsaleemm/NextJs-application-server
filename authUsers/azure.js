import azure from 'azure-storage';
import bcrypt from 'bcryptjs';
import queryTable from '../helpers/azure/queryTable';
// Using reusable table service
import { tableService } from '../projects/adapterAzure/';

const tableName = 'users';

/**
 * validates/invalidates the username/password auth from azure
 * @param {*} username
 * @param {*} password
 */
export const getUser = async ({ username = '', password }) => {
    // Always handle and store as lower case
    const query = new azure.TableQuery().where('username eq ?', username.toLowerCase());
    const { 0: { password: passwordCheck, ...user } = {} } = 
        await queryTable({ tableService, query, tableName });
    // check if the query corrosponding entry has been found or not
    if (passwordCheck) {
        const res = await bcrypt.compare(password, passwordCheck);
        return res === true ? user : false;
    }
    return false;
}

export const getClients = async () => 
    await queryTable({ 
        tableService, 
        query: new azure.TableQuery().where("client eq ?", true),
        tableName
    });
