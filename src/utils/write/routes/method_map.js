Array.prototype.indent = function(level) {
  return this.map((i) => {
    return `${'\t'.repeat(level)}${i}`;
  })
}

module.exports = {
 errHandle: function ()  {
  return `\t.catch((err) => { res.send(err) });\n`;
 },

 sendOk: function() {
  return `res.send(200);`;
 },

 send: function(message) {
  return `res.send(${message})`
 },

 getBody: function () {
  return `const { body } = req;\n`;
 },

 getId: function() {
  return `const { id } = params;\n`;
 },

 resourceConstruct: function (config) {
  const { className, resourceName } = config;
  return `const ${resourceName} = new ${className}(body);`
 },

 saveResource: function (config) {
  const { resourceName } = config;
  return `await ${resourceName}.save()`
 },

 deleteResource: function(config) {
  const { className } = config;
  return `await ${className}.deleteOne({ _id: id })`;
 },

 setData: function(config) {
  const { resourceName } = config;
  return `${resourceName}.set(body);`
 },

 findAll: function (config)  {
   const { className, pluralResourceName } = config;
   return `const ${pluralResourceName} = await ${className}.find()`
 },

 findOne: function (config)  {
  const { resourceName, controllerName } = config;
  return `const ${resourceName} = await ${controllerName}.findOne({ _id: id })`
 },

 returnSingle: function (config)  {
  const { resourceName } = config;
  return `return ${resourceName};`;
 },

 returnPlural: function (config)  {
  const { pluralResourceName } = config;
  return `return ${pluralResourceName};`
 },

 sendSingle: function (config)  {
  const { resourceName } = config;
  return `res.send(${resourceName});`;
 },

 sendPlural: function (config)  {
  const { pluralResourceName } = config;
  return `res.send(${pluralResourceName});`
 },

 expressRoute: function (config, routeConfig)  {
  const { resourceName, middleware, pluralResourceName, controllerName } = config;
  const { verb, id, route, command } = routeConfig;

  const stem = `app.${verb}('${'/' + pluralResourceName + '/'}${id ? ':id' : ''}',`,
        middlewareSection = ` ${ middleware.map((mw) => mw + ',') }`,
        handler = ` ${controllerName}.${command});`

  return  `${stem}${middlewareSection}${handler}`;
 },

 all: function (config) {
    return [
      this.findAll(config),
      this.errHandle(),
      this.sendPlural(config)
    ];
 },

 new: function (config) {
    return [
      this.getBody(),
      this.resourceConstruct(config),
      this.saveResource(config),
      this.errHandle(),
      this.sendSingle(config)
    ];
 },

 update: function (config) {
    return [
      this.getBody(),
      this.findOne(config),
      this.errHandle(),
      this.setData(config),
      this.saveResource(config),
      this.errHandle(),
      this.sendOk()
    ];
 },

 destroy: function (config) {
    return [
      this.getId(),
      this.deleteResource(config),
      this.errHandle(),
      this.sendOk()
    ];
 },

 get: function (config) {
    const { relToWrite } = config;
    return ``

 },

 find: function (config) {
    return [
      this.getId(),
      this.findOne(config),
      this.errHandle(),
      this.sendSingle(config)
    ];
 },

 buildController: function (config)  {
  const { commands, pluralResourceName, controllerName } = config;
  commands.pop()

  return commands.map((command) => {


    return [
    `exports.${command} = async function( res, req, next) {\n`,
      this[command](config).indent(1).join('\n'),
      `\n};`]
    .join('')
  }).join('\n\n')
 }
}
