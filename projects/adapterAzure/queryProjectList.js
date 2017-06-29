import queryTableAll from '../helpers/azure/queryTableAll';
import { tableService, tableName } from './';

export default async ({ studyUID = '' }) => {
    return await queryTableAll({ tableService, tableName });
};