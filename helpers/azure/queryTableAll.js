import azure from "azure-storage";
import queryTable from './queryTable';

export default async ({
    tableName,
    tableService,
    select = [],
}) => {
    const query = new azure.TableQuery()
        .select(select);

    return await queryTable({ tableService, query, tableName });
}