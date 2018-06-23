import azure from "./azure";
import local from "./local";

// process.env.LOCAL !== undefined
//     ? require("./adapterLocal")
//     : require("./adapterAzure")

export default () =>
  process.env.LOCAL !== undefined ? local() : azure();

//   return {
//     ...azure
//   };
// };
