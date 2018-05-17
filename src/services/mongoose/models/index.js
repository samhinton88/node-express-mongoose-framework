const { capitalise, writeContent } = require('../../../utils');
const mkFileStruct = require('../model-config');
const fs = require('fs');
const path = require('path');

module.exports = async function modelBuilder(modelName, targetdir, config = {}) {
  let buildStructCount = 0;

  const modelDir = targetdir + '/dist/models/';

  if (typeof targetdir === 'string'){
    log('green', 'START WORK, IN IF STATEMENT')

    const struct = mkFileStruct(modelName);

    await writeFileStruct(struct, modelDir)
  }

  log('green' ,'DONE WORK, OUT OF IF STATEMENT, SHOULD BE LAST LINE')

  async function writeFileStruct(structObj, filePath) {

    log('red' ,'Running: writeFileStruct')

    const objectName = Object.keys(structObj)[0];
    const parentPath = filePath + '/' + objectName;

    await makeDir(parentPath);
    await buildStruct(parentPath, structObj[objectName]);

    async function buildStruct(filePath, structObj) {
      buildStructCount++
      log('blue','Running: buildStruct level', buildStructCount, )

      const layer = structObj;

      for (let k of Object.keys(layer)){

        const value = layer[k];

        if (Array.isArray(value)) {

          await makeFile(filePath, value);

        } else {

          await makeDir(filePath + '/' + k);

          await buildStruct(filePath + '/' + k, value);
          buildStructCount--
        }
      }

      log('blue', 'finished buildStruct', buildStructCount)
    }
    log('red', 'finished writeFileStruct')
    return structObj;
  }

};

function makeFile(rootName, config) {

    const [fileName, conf] = config;

    const content = writeContent(conf)|| null;

    const p = new Promise(function(resolve, reject) {
      fs.writeFile(rootName + '/' + fileName, content, (err) => {
        if (err) {
          console.log(err)
          reject(err);
        }

        resolve('true');
      });
    })

    p
    .then((obj) => {console.log(obj)})
    .catch((err) => {throw new Error("HIGH" + err)})
    .catch((err) => {log(err)})

}

function makeDir(rootName) {

  const p = new Promise(function(resolve, reject) {
      fs.mkdir(rootName, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        console.log('success')
        resolve('success')
      })
    })

  p
  .then((obj) => {console.log(obj)})
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

