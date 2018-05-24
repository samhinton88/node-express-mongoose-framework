// utils to generate file content
const generate_mongoose_schema_body_content     = require('./generate_mongoose_schema_body_content');
const generate_express_controller_body_content  = require('./generate_express_controller_body_content');

function writeContent(fileStructureConfig, writeConfig) {
  // console.log('fileStructureConfig in writeContent', fileStructureConfig)
  // console.log('writeConfig in writeContent', writeConfig)
  console.log('in writeContent')

  const {
    requiredModules =[],
    requiredExports =[],
    identifier = ""
  } = fileStructureConfig;

  const output = [
    ...requireStatements(requiredModules),
    ...bodyLines(writeConfig, identifier),
    ...exportStatements(requiredExports)
  ];

  return output.join('\n');
};

function requireStatements(requiredModules) {
  const sortReqType = (a, b) => a.type === 'node' ? -1 : 1;
  console.log('required modules' , requiredModules)

  if (
    requiredModules === undefined ||
    requiredModules.length === 0
    ) { return []}

  return requiredModules
          .sort(sortReqType)
          // refactor map function
          .map((reqMod) => {

            const { name, type, depth, destructuring, origin, prefix = '' } = reqMod;

            let varAssign, varName;

            if (destructuring) {
              varName = `{ ${name} }`;
            } else {
              varName = name;
            }
            const trail = depth > 1 ? '../'.repeat(depth) : './'
            varAssign = `require('${type === 'rel' ? trail : ''}${prefix}${origin || name}')`;
            return `const ${varName} = ${varAssign};`
          });

};

function bodyLines(config, identifier) {


  let output = [];

  switch(identifier) {
    case 'mongoose_model':
      console.log('is model')
      output = [`\nconst model = mongoose.model('${config.name}', schema);`]
      break;
    case 'mongoose_schema':
      console.log('is schema')
      output = generate_mongoose_schema_body_content(config)
      break;
    case 'express_controller':
      console.log('is controller');
      output = generate_express_controller_body_content(config)
      break;

  }

  return output;
};

function exportStatements(requiredExports) {

  return requiredExports.length !== 0
    ? [`\nmodule.exports = ${requiredExports.map((rE) => rE).join(', ')||null};`]
    : [''];
};



module.exports = writeContent;
