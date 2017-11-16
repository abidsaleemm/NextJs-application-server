module.exports =
  process.env.LOCAL !== undefined
    ? require("./local")
    : require("./azure");