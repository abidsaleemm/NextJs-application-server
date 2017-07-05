import azure from "azure-storage";
import queryTable from './helpers/queryTable';

export default async ({ studyUID }) => {
    const tableName = `${process.env.APPSETTING_CONTAINER}Studies`; // TODO create const in upper scope for the three types of tables
    const query = new azure.TableQuery()
        .select([])
        .where('RowKey eq ?', studyUID);

    const { 0: ret } = await queryTable({ query, tableName });
    return ret;
};