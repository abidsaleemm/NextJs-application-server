import * as adapterJSON from './adapterJSON';
import * as adapterAzure from './adapterAzure';
import createProject from './createProject';

// process.env.LOCAL_PROJECTS
// module.exports = {
//     ...adapterJSON,
//     createProject,
// };

// import * as adapterAzure from './adapterAzure';
// import * as adapterLocal from './adapterLocal';

module.exports = process.env.LOCAL_PROJECTS !== undefined ? adapterLocal : adapterAzure;
