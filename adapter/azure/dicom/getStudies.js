export default async ({
  tablePrefix,
  tableAdapter: { queryTableAll }
}) =>
  await queryTableAll({
    tableName: `${tablePrefix}Studies` // TODO is this good practice to use ENV cars mixed in?
  });
