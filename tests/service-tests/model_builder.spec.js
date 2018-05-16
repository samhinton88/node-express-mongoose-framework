const { modelBuilder } = require('../../src/services/');
const { deleteFileStruct } = require('../../src/utils');
const fs = require('fs');


describe('Mongoose model builder', () => {
  beforeAll(async () => {
    return await deleteFileStruct(
      '/Users/samhinton/code/samhinton88/node-express-mongoose-framework/dist/models',
      'user'
      );
  });

  test('is not undefined', () => {
    expect(modelBuilder).not.toBeUndefined();
  });

  test('it registers the name of a model to be created', () => {
    expect(modelBuilder('user').modelName).toBe('user');
  });

  test('it expects a config object as a second argument', () => {
    expect(modelBuilder('user', {config: 'config'}).config).not.toBeUndefined();
  });

  test('it should return a build property', () => {
    expect(modelBuilder('user').build).not.toBeUndefined()
  });

  test('it should return a file structure on the build prop', () => {
    const exampleStructure = {
      User: {
        schema: {
          methods: {
            file: 'index.js'
          },
          file: 'index.js'
        },
        file: 'index.js',
        instanceMethods: {
          file: 'index.js'
        }
      }
    };

    expect(modelBuilder('user').build.dirStruct).toEqual(exampleStructure)
  })

  test('creates the dir structure', () => {
    modelBuilder('user', '/Users/samhinton/code/samhinton88/node-express-mongoose-framework')
    expect(false);
  })

})
