module.exports = process.env.LOCAL !== undefined ? 
    require('./adapterLocal') : require('./adapterAzure');
