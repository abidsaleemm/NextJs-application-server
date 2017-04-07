if (process.env.NODE_ENV === 'local') {
  module.exports = require('./adapterSQLite'); // eslint-disable-line global-require
} else {
  module.exports = require('./adapterAzureSQL'); // eslint-disable-line global-require
}
