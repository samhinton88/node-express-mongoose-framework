const commandMap = require('./command_map');
const methodMap = require('./method_map');
const { writeConfig, generateNames, generateCrudActions } = require('./resource_config_object');

console.log(generateNames)


const verbs            =  ['get', 'post', 'put','delete'];
const controllerAction =  ['findOne', 'errHandle', 'returnStatement'];
const commands         =  ['all', 'new', 'find', 'update', 'destroy'];

module.exports = {
  commandMap,
  methodMap,
  writeConfig,
  verbs,
  controllerAction,
  writeConfig,
  commands,
  generateNames,
  generateCrudActions
}
