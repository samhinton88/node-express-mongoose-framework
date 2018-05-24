module.exports = function(config) {
  const {props} = config;
  let varName, varAssign;

    // file to build is mongoose schema

  varName = 'schema'


  const lines = props.map(mkPropLine);

  varAssign = `new Schema({\n${lines.join('\n')}\n})`

  return [`const ${varName} = ${varAssign};`];

  function mkPropLine(prop) {
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

    return str;

  }

  function stringLit(string) {
    return `'${string}'`
  }

}
