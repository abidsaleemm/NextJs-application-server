// require('babel-register');
// require('')
// require('babel-core/register');
require("babel-register")({
  presets: ["env"]
});

require("babel-polyfill");
require("dotenv").config();
require("./server");
