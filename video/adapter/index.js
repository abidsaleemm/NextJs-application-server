module.exports =
  process.env.LOCAL !== undefined
    ? require("../../adapter/local/video/index")
    : require("../../adapter/azure/video/index");
