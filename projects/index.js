// TODO Use a fnction to create adapter and import from different location

module.exports =
  process.env.LOCAL !== undefined
    ? require("./adapterJSON")
    : require("./adapterAzure");
