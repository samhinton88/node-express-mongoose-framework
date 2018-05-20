'use strict'

module.exports = function CLI(input) {
  const cLInput = input;

  // id base command
  const [directory, verb, type] = input.slice(1);

  let output;

  //
  switch (type) {
    case 'resource':
      output = resourceParse(input.slice(4));
      break;
  }

  return output;
}

function resourceParse(input) {

  const typeHash = {
    'S': String,
    'D': Date,
    'N': Number,
    'BOOL': Boolean
  };

  const optHash = {
    'r': ['required', true],
    'u': ['unique', true],

  }

  const flagHash = {
    '-C': ['controller', 'type', 'CRUD'],
    '-cache': ['controller','shouldCache', true]
  }

  const config = {};
  config.name = input[0];
  config.db = 'mongoDB';
  config.type = 'resource';
  config.props = [];
  config.refs = [];
  config.controller = {}

  const args = input.slice(1)

  args.forEach((arg) =>{
    const output = {};
    const fChar = arg.charAt(0);

    if(fChar === '-') {
      const flagPath = flagHash[arg];
      const val = flagPath.pop()
      assignValueToPath(config, val, flagPath  )

      // config[flagPair[0]] = flagPair[1];
      return
    }


    if (!['.', ':'].includes(fChar)) {
      // token found

      const [propName, propConfig] = arg.split(':');
      output.propName = propName;

      if (propConfig === undefined) {
        config.props.push(output);
        return
      }

      // expect config to be delimited by commas
      const opts = propConfig.split(',');

      opts.forEach((opt) => {

        if (['S', 'N', 'D', 'BOOL'].includes(opt)) {
          output.type = typeHash[opt];
          return
        }

        if (opt.split('[')[0] === 'ref') {
          // is ref to other resource
          const refObj = {};
          refObj.rel = isPlural(propName) ? 'hasMany' : 'hasOne';
          const refName = getDefaultOpt(opt);
          refObj.refName = refName;
          config.refs.push(refObj);
          output.type = 'objectID';
          output.ref = refName;
          return
        }

        if (opt.charAt(0) === 'd') {
          // option has default
          const defValue = getDefaultOpt(opt);
          output.default = defValue;
          return
        }

        const [optionKey, optionVal] = optHash[opt];
        output[optionKey] = optionVal;
      })
    }
    const { type, propName } = output;

    if (output.default && type !== String) {
      // coerce default value
      if (type === Number) {
        output.default = parseInt(output.default)
      } else if (type === Date ){
        output.default = Date[output.default]
      } else if (type === Boolean) {
        output.default = output.default === 'true' ? true : false;
      }
    }

    if (isPlural(propName)) {
      // prop is array
      output.type = [type];
    }

    config.props.push(output)
  })

  return config;

}

function isPlural(string) {
  return lastOf(string).toLowerCase() === 's';
}

function getDefaultOpt(opt) {
  let defaultValue = opt.split('[')[1].split('');
  defaultValue.pop()
  const defValue = defaultValue.join('');
  return defValue;
}

function lastOf(string) {
  return string.charAt(string.length - 1);
}

function lookUp(path, obj, cb) {

    for (let i = 0; i < path.length -1; i++) {

      obj = obj[path[i]];

    }

    cb(obj[path[path.length -1]]);
  }
function assignValueToPath(obj, data, path) {
    console.log('fpath ', path )
    console.log('data', data)
    console.log(obj)

    for (let i = 0; i < path.length -1; i++) {
      obj = obj[path[i]];
    }

    obj[path[path.length -1]] = data;
  }



