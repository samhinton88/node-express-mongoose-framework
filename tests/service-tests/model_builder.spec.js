const { modelBuilder } = require('../../src/services/');
const { deleteFileStruct } = require('../../src/utils');
const CLI = require('../../src/interface');
const fs = require('fs');


describe.skip('Mongoose model builder', () => {
  let command;


  beforeAll(async () => {
    await Promise.all([
      deleteFileStruct(
      '/Users/samhinton/code/samhinton88/node-express-mongoose-framework/dist/models',
      'architect'
      ),
      deleteFileStruct(
      '/Users/samhinton/code/samhinton88/node-express-mongoose-framework/dist/controllers',
      'architect-controller'
      )
      ])

    command = '/usr/local/bin/node /Users/samhinton/code/samhinton88/node-express-mongoose-framework/ create resource architect firstName:S,r lastName:S,r isClient:BOOL,d[false] qualifications:ref[qualification] wage:N,d[0] locale:S,d[GB] -C'.split(' ')
  });

  test.skip('creates the dir structure',  async () => {
    modelBuilder('user', '/Users/samhinton/code/samhinton88/node-express-mongoose-framework')
  })

  test('expects input from CLI properly', () => {
    const inputConfig = CLI(command);


    modelBuilder(inputConfig);
  })

})
