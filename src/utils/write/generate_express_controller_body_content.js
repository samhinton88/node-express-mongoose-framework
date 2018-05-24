const { giveNames } = require('./method_instruction');


module.exports = function(config) {
  // generate strings for boy of express controller
  const crudMethods = ['all', 'find', 'new', 'update', 'destroy'];

  const { refs, controller, name } = config;

  const { classToken, pluralToken, camelToken } = giveNames(name);

  // config for each of the CRUD methods
  const crudMethodCBs = {
    all:      { send: name + 's', qVar: pluralToken, call: '({})', methodName: 'find' },
    find:     { send: camelToken, qVar: name, call: `({ _id: req.params.id})` },
    new:      {
      send: 200,
      methods: ['constr', 'save'],
    },
    update:   {
      send: 200,
      methods: ['findOne', 'set', 'save'],
      call: `({${camelToken}Data})`
    },
    destroy:  {
      send: 200,
      qVar: 'none',
      call: `({ _id: req.params.id})`,
      methodName: 'deleteOne'
    },
  }

  const subMethods = {
    constr: `\tconst ${name} = new ${classToken}(req.body.${name + 'Data'});\n`,
    save: `\tawait ${name}.save();\n`,
    set: `\t${camelToken}.set(params.${name}Data)\n`,
    findOne: `\tconst ${camelToken} = await ${classToken}.findOne({req.params.id})\n`
  }

  // build crud controllor methods
  const lines = crudMethods.map((crudMethod) => {
    const {send, qVar, call, methodName, methods } = crudMethodCBs[crudMethod];

    // if config has an array of methods print a new line with each method
    let methodsStr = '';

    if(Array.isArray(methods)) {
      methodsStr = methods.map((method) => {
          return subMethods[method];
        }).join('')
    }

    const assignmentStr = `\nexports.${crudMethod} = async function(req, res, next) {\n`;
    const queryStr = qVar
      ? `\t${qVar !== 'none'? `const ${qVar} = ` : ''}await ${classToken}.${methodName ? methodName : crudMethod}${call};\n`
      : '';
    const sendStr = `\n\tres.send(${send});`;

    return `${assignmentStr}${methodsStr}${queryStr} ${sendStr}\n}`;
  });

  refs.forEach((ref) => {
    const { rel, refName } = ref;

    const camelRef = camelCase('get_' + refName);
    const assignmentStr = `\nexports.${camelRef + 's'} = async function(req, res, next) {\n`;
    const queryStr = `\tconst ${refName+'s'} = await ${classToken}.findOne({req.params.id})\n\t\t.populate('${refName}s');\n`;
    const sendStr = `\n\tres.send(${camelRef + 's'});`

    lines.push(`${assignmentStr}${queryStr}${sendStr}\n}`)
  })



  return lines;
}

function camelCase(string) {

  const processedStr = string
    .split('_')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('');

  return processedStr.charAt(0).toLowerCase() + processedStr.slice(1);
}

function capitalise(string) {
  return string
    .split('_')
    .map((word) => {
      console.log(word)
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('');
}
