const { modelBuilder } = require('../../src/services/');
const { deleteFileStruct } = require('../../src/utils');
const CLI = require('../../src/interface');
const fs = require('fs');


describe('Mongoose model builder', () => {
  let command;


  beforeAll(async () => {
    await deleteFileStruct(
      '/Users/samhinton/code/samhinton88/node-express-mongoose-framework/dist/models',
      'architect'
      ).catch(() => {});
    command = '/usr/local/bin/node /Users/samhinton/code/samhinton88/node-express-mongoose-framework/ create resource architect firstName:S,r lastName:S,r isClient:BOOL,d[false] buildings:ref[building] wage:N,d[0] locale:S,d[GB]'.split(' ')
  });

  test.skip('creates the dir structure',  async () => {
    modelBuilder('user', '/Users/samhinton/code/samhinton88/node-express-mongoose-framework')
  })

  test('expects input from CLI properly', () => {
    const inputConfig = CLI(command);


    modelBuilder(inputConfig);
  })

})
