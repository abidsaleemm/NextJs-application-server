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
  plugins: [["transform-define", { "process.env.STAGING": "true" }]]
});
require("@babel/polyfill");

require("dotenv").config();
require("./server");
