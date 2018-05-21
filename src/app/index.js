const modelBuilder = require('../services/mongoose/models');

module.exports = function mkInstance(input) {
  // control top level flow for app
  console.log('input in mkInstance', input);
  modelBuilder(input.name, input.directory, input)
};
