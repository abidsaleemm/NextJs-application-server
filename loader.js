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
  ]
});
require("@babel/polyfill");

require("dotenv").config();
require("./server");
