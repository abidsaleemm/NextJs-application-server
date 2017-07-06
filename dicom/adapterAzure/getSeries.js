import azure from "azure-storage";
import queryTable from './helpers/queryTable';

export default async ({ studyUID }) => await queryTable({
    query: new azure.TableQuery()
        .select(['seriesName', 'seriesUID'])
        .where('studyUID eq ?', studyUID),
    tableName: `${process.env.APPSETTING_CONTAINER}Series`,
});