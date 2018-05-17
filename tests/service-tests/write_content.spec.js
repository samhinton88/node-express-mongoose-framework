const { writeContent } = require('../../src/utils');

describe.skip('writeContent', () => {
  test('should not be undefined', () => {
    expect(writeContent).not.toBeUndefined();
  });

  test('should write a mongoose model given config', () => {
    const config = {
      requiredModules: [
        {name: 'schema', type: 'rel', depth: 1},
        {name: 'mongoose', type: 'node'}
      ],
      bodyConfig: [
        {type: 'mongooseModel', schemaName: 'user'}
      ],
      requiredExports: [
        'model'
      ]
    };
    const desiredOutputString = `const mongoose = require('mongoose');\nconst schema = require('./schema');\nconst model = mongoose.model('user', schema);\n\nmodule.exports = model;`;
    expect(writeContent(config)).toBe(desiredOutputString);
  })


})
