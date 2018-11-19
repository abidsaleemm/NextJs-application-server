const fs = require("fs");

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
        // TODO Hardcode for now, but maybe declare these in an array. WG
        if (filepath.includes("node_modules/adapters")) {
          const isSymbolicLink = fs
            .lstatSync("node_modules/adapters")
            .isSymbolicLink();

          return isSymbolicLink;
        }

        return true;
      }

      return false;
    }
  ]
});

require("@babel/polyfill");
require("dotenv").config();
require("./server").default();
