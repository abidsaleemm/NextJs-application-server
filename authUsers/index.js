// This might work but need to look into definePlugin not working on client side.
// module.exports = process.env.NODE_ENV === 'dev' ? require("./local") : require("./azure");
module.exports =
  process.env.LOCAL !== undefined
    ? require("./local")
    : require("./azure");
