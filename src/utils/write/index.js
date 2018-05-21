// utils to generate file content
function writeContent(fileStructureConfig, writeConfig) {
  console.log('fileStructureConfig in writeContent', fileStructureConfig)
  console.log('writeConfig in writeContent', writeConfig)

  const {
    requiredModules =[],
    requiredExports =[],
    bodyConfig = [],
    identifier = ""
  } = fileStructureConfig;



  const output = [
    ...requireStatements(requiredModules),
    ...bodyLines(bodyConfig, identifier, writeConfig),
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

function bodyLines(bodyConfig, identifier, _config) {
  console.log('_config in bodyLines', _config)

  if (
    bodyConfig === undefined ||
    bodyConfig.length === 0
    ) { return []}

  const {modelName = null, type} = bodyConfig[0];
  const {props} = _config;
  let varName, varAssign;
  if (type === 'mongooseModel') {
    varName = 'model';
    varAssign = `mongoose.model('${modelName}', schema)`
  } else {
    // file to build is mongoose schema

    varName = 'schema'

    const lines = [];
    props.forEach((prop) => {
      console.log(prop)
      const {propName, type, required, ref} = prop;

      let propNameStr, typeStr, reqStr, refStr, defStr;

      const typeArr = Array.isArray(type)

      if (typeArr && ref !== undefined) {
        typeStr = 'mongoose.Schema.Types.ObjectId';
      } else if (typeArr) {
        typeStr = type[0].name;
      } else {
        typeStr = type.name;
      }

      if (typeStr === 'String' && prop.default !== undefined) {
        defStr = `, default: ${stringLit(prop.default)}`;
      } else if (typeStr === 'Date' && prop.default !== undefined){
        defStr = `, default: ${typeStr}.${prop.default.name}()`;
      } else {
        defStr = prop.default !== undefined ? `, default: ${prop.default}` : '';
      }

      reqStr = required ? `, required: ${required}` : '';
      refStr = ref ? `, ref: '${ref}'` : '';

      const str = typeArr
        ? `\t${propName}: [{ type: ${typeStr}${refStr}${reqStr}${defStr} }],`
        : `\t${propName}: { type: ${typeStr}${refStr}${reqStr}${defStr} },`

      lines.push(str);
      console.log(lines.join('\n'))

      function stringLit(string) {
        return `'${string}'`
      }


    })

    varAssign = `new Schema({\n${lines.join('\n')}\n})`
  }

  return [`const ${varName} = ${varAssign};`]
};

function exportStatements(requiredExports) {

    return [`\nmodule.exports = ${requiredExports.map((rE) => rE).join(', ')||null};`]
};



module.exports = writeContent;
