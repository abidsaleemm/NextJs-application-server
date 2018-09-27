require("@babel/register")({
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "10"
        }
      }
    ]
  ],
  ignore: [
    function(filepath) {
      if (filepath.includes("node_modules")) {
        return filepath.includes("/adapters/") ? false : true;
      }
      return false;
    }
  ]
});
require("@babel/polyfill");

require("dotenv").config();

require("./server").default();
