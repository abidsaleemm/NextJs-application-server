import * as adapterJSON from './adapterJSON';
import * as adapterAzure from './adapterAzure';

// TODO Handle as a function
module.exports = process.env.LOCAL_PROJECTS !== undefined ? adapterJSON : adapterAzure;
