const { modelBuilder } = require('../../src/services/');
const { deleteFileStruct } = require('../../src/utils');
const fs = require('fs');


describe.only('Mongoose model builder', () => {
  beforeAll(async () => {
    await deleteFileStruct(
      '/Users/samhinton/code/samhinton88/node-express-mongoose-framework/dist/models',
      'User'
      ).catch(() => {});
  });



  test('creates the dir structure',  async () => {
    modelBuilder('user', '/Users/samhinton/code/samhinton88/node-express-mongoose-framework')
  })

})
