import queryTable from '../helpers/azure/queryTable';
import { tableService, tableName } from './';

export default async ({ studyUID = '' }) => {
    // TODO Build query and run
    return await queryTableAll({ tableService, tableName });
};