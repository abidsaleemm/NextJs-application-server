import queryTableAll from '../../helpers/azure/queryTableAll';
import { tableService, tableName, createTable } from './';

export default async () => {
    await createTable();

    const values = await queryTableAll({ tableService, tableName });

    return values.map(({ RowKey: studyUID, status = 0, client = 0 }) => 
        ({ studyUID, status, client }));
};