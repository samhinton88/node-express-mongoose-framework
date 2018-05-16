const { capitalise } = require('../../../utils');
const fs = require('fs');
const path = require('path');

module.exports = function modelBuilder(modelName, targetdir, config = {}) {
  const output = {};
  output.modelName = modelName;
  output.config = config;
  output.build = {};
  output.build.dirStruct = mkFileStruct(modelName);

  const modelDir = targetdir + '/dist/models/';

  if (typeof targetdir === 'string'){
    writeFileStruct(output.build.dirStruct, modelDir)
  }


  function mkFileStruct(modelName) {
    const obj = {};
    obj[capitalise(modelName)] = {
      file: 'index.js',
      schema: {
        file: 'index.js',
        methods: {
          file: 'index.js',
        },
      },
      instanceMethods: {
        file: 'index.js'
      }
    };


    return obj;
  }



  async function writeFileStruct(structObj, filePath) {
    // create dir structure to match structObj
    // fs.mkdir("dirname", cb)
    // name of top folder
    const objectName = Object.keys(structObj)[0];

    const parentPath = filePath + '/' + objectName;


    // make top level folder
    fs.mkdir(parentPath, (err) => {
      console.log(err);

    });

    // enter object
    const layer1 = structObj[objectName];
    Object.keys(layer1).forEach((k) => {
      if (typeof layer1[k] === 'string') {
        // create new file
        fs.writeFile('/dist/models/User/index.js', (err) => {
          if(err) {
            console.log(err)
          }
        })
      }
    })

  }

  return output;
};

function makedir(dirname) {

}




