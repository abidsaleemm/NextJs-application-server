import azure from "azure-storage";
import queryTable from './queryTable';

export default async ({
    tableName,
    select = [],
}) => {
    const query = new azure.TableQuery()
        .select(select);

    return await queryTable({ query, tableName });
}