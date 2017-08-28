module.exports = process.env.LOCAL ? require("./local") : require("./azure");
