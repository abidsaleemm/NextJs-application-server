module.exports = process.env.LOCAL_DICOM !== undefined ? 
    require('./adapterLocal') : require('./adapterAzure');
