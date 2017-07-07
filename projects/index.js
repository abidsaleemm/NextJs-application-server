module.exports = process.env.LOCAL_PROJECTS !== undefined ? 
    require('./adapterJSON') : require('./adapterAzure');
