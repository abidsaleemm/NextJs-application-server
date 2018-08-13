const get = async ({ tableAdapter, tableName, key }) => {};

const insertMerge = async ({
  tableAdapter,
  tableName,
  key,
  value = {}
}) => {};

const del = async ({ tableAdapter, tableName, key }) => {};

export default ({ tableName = "" }) => {
  return {
    get: async props => await get({ ...props, tableName }),
    insertMerge: async props =>
      await insertMerge({ ...props, tableName }), // Should insert or merge
    del: async props => await del({ ...props, tableName })
  };
};
