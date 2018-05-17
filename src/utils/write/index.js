// utils to generate file content
function writeContent(config) {

  const {
    requiredModules =[],
    requiredExports =[],
    bodyConfig = [],
    identifier = ""
  } = config;

  const output = [
    ...requireStatements(requiredModules),
    ...bodyLines(bodyConfig, identifier),
    ...exportStatements(requiredExports)
  ];

  return output.join('\n');
};

function requireStatements(requiredModules) {
  const sortReqType = (a, b) => a.type === 'node' ? -1 : 1;

  if (
    requiredModules === undefined ||
    requiredModules.length === 0
    ) { return []}

  return requiredModules
          .sort(sortReqType)
          // refactor map function
          .map((reqMod) => {

            const { name, type, depth, destructuring, origin } = reqMod;

            let varAssign, varName;

            if (destructuring) {
              varName = `{ ${name} }`;
            } else {
              varName = name;
            }

            varAssign = `require('${'./'.repeat(depth)}${origin || name}')`;
            return `const ${varName} = ${varAssign};`
          });

};

function bodyLines(bodyConfig, identifier) {

  if (
    bodyConfig === undefined ||
    bodyConfig.length === 0
    ) { return []}

  const {modelName = null, type} = bodyConfig[0];
  let varName, varAssign;
  if (type === 'mongooseModel') {
    varName = 'model';
    varAssign = `mongoose.model('${modelName}', schema)`
  } else {
    varName = 'schema'
    varAssign = '{}'
  }

  return [`const ${varName} = ${varAssign};`]
};

function exportStatements(requiredExports) {

    return [`\nmodule.exports = ${requiredExports.map((rE) => rE).join(', ')};`]
};



module.exports = writeContent;
