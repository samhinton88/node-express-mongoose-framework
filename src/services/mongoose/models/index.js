const { capitalise, writeContent, makeDir } = require('../../../utils');
const mkFileStruct = require('../model-config');
const fs = require('fs');
const path = require('path');

module.exports = async function modelBuilder(config = {}) {
  const { name, db, type, refs, directory, controller } = config;
  let buildStructCount = 0;

  // establish directory in which to write model for given resource
  // TODO: swap out 'dist' for elected dir
  log('bright', `has controller: ${controller !== undefined}`)

  const modelDir      = directory + '/dist/models/';
  const controllerDir = directory + '/dist/controllers/';

  // await makeDir(controllerDir)



  log('green', 'START WORK TO BUILD MODEL')

  // make a blueprint for the directory structure of the model
  const modelBlueprint = mkFileStruct(name, 'model', name);

  const controllerBlueprint = mkFileStruct(name, 'controller', );
  // console.log('controllerBlueprint', controllerBlueprint)

  // console.log('CONFIG', config)
  // console.log('IN modelBlueprint', modelBlueprint.architect.schema)

  await writeToFileStruct(modelBlueprint, modelDir, config, name);
  await writeToFileStruct(controllerBlueprint, controllerDir, config, `${name}-controller`);


  log('green' ,'DONE WORK, OUT OF IF STATEMENT, SHOULD BE LAST LINE')

  async function writeToFileStruct(structObj, filePath, config, fileName) {

    log('red' ,'Running: writeFileStruct')
    // parent dir for model
    const parentPath = filePath + '/' + fileName;

    // console.log('PARENT PATH', parentPath)

    // create dir for parent path
    await makeDir(parentPath);
    //
    await buildStruct(parentPath, structObj[name], config);

    async function buildStruct(filePath, structObj, config) {
      // console.log('in buildStruct with filePath:\n', filePath,'\nstructObj:\n', structObj,'\nconfig:\n', config)
      buildStructCount++
      log('blue','Running: buildStruct level', buildStructCount, )

      const layer = structObj;

      for (let k of Object.keys(layer)){

        const value = layer[k];

        if (Array.isArray(value)) {
          // object is config to write the file
          // console.log('arguments to makeFile', filePath, value, config)

          await makeFile(filePath, value, config);

        } else {
          // object is a new dir
          await makeDir(filePath + '/' + k);

          // recursively build files in new dir
          await buildStruct(filePath + '/' + k, value, config);
          buildStructCount--

        }
      }

      log('blue', 'finished buildStruct', buildStructCount)
    }
    log('red', 'finished writeFileStruct')
    return structObj;
  }

};

function makeFile(rootName, config, _config) {
    // console.log('_config on makeFile', _config)

    const [fileName, conf] = config;
    // console.log('MAKEFILE', conf)

    const content = writeContent(conf, _config)|| null;

    // console.log(content)

    const p = new Promise(function(resolve, reject) {
      fs.writeFile(rootName + '/' + fileName, content, (err) => {
        if (err) {
          console.log(err)
          reject(err);
        }

        resolve();
      });
    })

    p
    .then((obj) => {})
    .catch((err) => {throw new Error("HIGH" + err)})
    .catch((err) => {log(err)})
}

function log(code,...strings) {
  const colours = {
    bright: "\x1b[1m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    blue: "\x1b[34m"
  }
  const colour = colours[code] || '';

  console.log(colour, ...strings)
  console.log("\x1b[0m")
}

