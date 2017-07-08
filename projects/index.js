module.exports = process.env.LOCAL !== undefined ? 
    require('./adapterJSON') : require('./adapterAzure');
