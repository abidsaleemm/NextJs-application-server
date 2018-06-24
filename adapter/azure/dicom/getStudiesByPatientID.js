import azure from "azure-storage";
//   import queryTable from './helpers/queryTable';
import { queryTable } from "../table";
// import { tablePrefix } from "./";

export default async ({ patientID, tablePrefix, tableService }) => {
  const tableName = `${tablePrefix}Studies`; // TODO create const in upper scope for the three types of tables
  const query = new azure.TableQuery()
    .select([])
    .where("patientID eq ?", patientID);

  return await queryTable({ query, tableName, tableService });
};
