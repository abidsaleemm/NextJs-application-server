
import * as adapterAzure from './adapterAzure';
import * as adapterLocal from './adapterLocal';

module.exports = process.env.LOCAL_DICOM !== undefined ? adapterLocal : adapterAzure;
