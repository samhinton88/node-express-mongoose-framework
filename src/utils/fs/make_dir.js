const fs = require('fs');

module.exports = function makeDir(rootName) {

  const p = new Promise(function(resolve, reject) {
      fs.mkdir(rootName, (err) => {

        if (err) {
          reject(err)
        }

        resolve()
      })
    })

  p
  .then((obj) => {})
  .catch((err) => {throw new Error("HIGH" + err)})
  .catch((err) => {console.log(err)})
};
