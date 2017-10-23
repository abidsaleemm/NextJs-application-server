module.exports = process.env.LOCAL ? require("./local") : require("./azure");
// Changing to es6 export.
