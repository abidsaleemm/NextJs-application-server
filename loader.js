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
        if (filepath.includes("/adapters/")) {
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
