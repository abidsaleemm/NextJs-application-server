if (process.env.NODE_ENV === 'local') {
  module.exports = require('./adapterJSON'); // eslint-disable-line global-require
} else {
  module.exports = require('./adapterJSON'); // eslint-disable-line global-require
}
