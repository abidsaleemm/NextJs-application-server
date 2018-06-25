import azure from "azure-storage";

export default async ({
  patientID,
  tablePrefix,
  tableAdapter: { queryTable }
}) => {
  const tableName = `${tablePrefix}Studies`; // TODO create const in upper scope for the three types of tables
  const query = new azure.TableQuery()
    .select([])
    .where("patientID eq ?", patientID);

  return await queryTable({ query, tableName });
};
