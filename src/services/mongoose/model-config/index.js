const {capitalise} = require('../../../utils');

module.exports = function mkFileStruct(resourceName, identifier) {
    switch (identifier) {
      case 'model':
        return mkMModel(resourceName);
        break;
      case 'controller':
        return mkController(resourceName);
        break;
    }
    return mkMModel(resourceName);

    function mkController(resourceName) {
      const obj = {};
      console.log('resourceName TOKEN IN MODEL-CONFIG' ,resourceName)

      const modelClassToken = capitalise(resourceName);
      console.log(capitalise.toString())
      console.log(capitalise('sam_hinton'))
      console.log('MODELCLASS TOKEN IN MODEL-CONFIG' ,modelClassToken)


      obj[resourceName] = {
        file: [
        'index.js',
        {
          identifier: 'express_controller',
          requiredModules: [
            { name: modelClassToken, type: 'rel' , depth:2, prefix: 'models/' },

          ],
          bodyConfig: [
            { }
          ]

        }
        ]
      }

      return obj;

    }

    function mkMModel(resourceName) {
      const obj = {};

      obj[resourceName] = {
        file: [
          'index.js',
        // this is the config passed to writeContent
          {
            identifier: 'mongoose_model',
            requiredModules: [
              { type: 'rel', name: 'schema', depth: 1 },
              { type: 'node', name: 'mongoose'}
            ],
            requiredExports: ['model'],
            bodyConfig: [
              {type: 'mongooseModel', resourceName}
            ]
          }
        ],
        schema: mkMSchema(resourceName),
        instanceMethods: mkInstanceMethods(resourceName)
      };

      return obj;

    };

  function mkMSchema(resourceName) {
    const obj = {};
    // config.propertyStatements.

    return {
        file: [
          'index.js',
          {
            identifier: 'mongoose_schema',
            requiredModules: [
              { name: 'Schema', type: 'node', destructuring: 1, origin: 'mongoose' }, // so here we need of knowing which schema methods are required ahead of time
              { name: 'methods', type: 'rel', depth: 1 }
            ],
            requiredExports: ['schema'],
            bodyConfig: [
              { type: 'mongooseSchema', resourceName: resourceName }
            ]
          }
        ],
        methods: mkSMethods(resourceName)
    };

  }

  function mkSMethods(resourceName) {

    const obj = {};
      return {
          file: [
          'index.js',
          {
          identifier: 'mongoose_schema_methods',
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

    function mkInstanceMethods(resourceName) {

      return {
          file: [
          'index.js',
          {
            identifier: 'mongoose_instance_methods',
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






