const {capitalise} = require('../../../utils');

module.exports = function mkFileStruct(modelName) {

    return mkMModel(modelName);

    function mkMModel(modelName) {
      const obj = {};

      obj[modelName] = {
        file: [
          'index.js',
        // this is the config passed to writeContent
          {
            identifier: modelName,
            requiredModules: [
              { type: 'rel', name: 'schema', depth: 1 },
              { type: 'node', name: 'mongoose'}
            ],
            requiredExports: ['model'],
            bodyConfig: [
              {type: 'mongooseModel', modelName}
            ]
          }
        ],
        schema: mkMSchema(modelName),
        instanceMethods: mkInstanceMethods(modelName)
      };

      return obj;

    };

  function mkMSchema(modelName) {
    const obj = {};

    return {
        file: [
          'index.js',
          {
            identifier: modelName,
            requiredModules: [
              { name: 'Schema', type: 'node', destructuring: 1, origin: 'mongoose' }, // so here we need of knowing which schema methods are required ahead of time
              { name: 'methods', type: 'rel', depth: 1 }
            ],
            requiredExports: ['schema'],
            bodyConfig: [
              { type: 'mongooseSchema', modelName: modelName }
            ]
          }
        ],
        methods: mkSMethods(modelName)
    };

  }

  function mkSMethods(modelName) {

    const obj = {};
      return {
          file: [
          'index.js',
          {
          identifier: modelName,
          requiredModules: [

            { type: 'node', name: 'mongoose'}
          ],
          requiredExports: ['model'],
          bodyConfig: [

          ]
          }
        ]
      }

  }

    function mkInstanceMethods(modelName) {

      return {
          file: [
          'index.js',
          {
            identifier: modelName,
            requiredModules: [
              // { type: 'rel', name: 'schema', depth: 1 },
              // { type: 'node', name: 'mongoose'}
            ],
            requiredExports: [],
            bodyConfig: [
              // {type: 'mongooseModel'}
            ]
          }
          ]
        }


  }
}






