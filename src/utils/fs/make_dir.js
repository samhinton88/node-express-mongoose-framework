const fs = require('fs');

module.exports = function makeDir(rootName) {


  const p = new Promise(function(resolve, reject) {
      fs.mkdir(rootName, (err) => {

        if (err) {
          reject(err)
        }
        console.log(rootName, 'should have been made successfully ')

        resolve()
      })
    })

  p
  .then((obj) => {})
  .catch((err) => {throw new Error("HIGH" + err)})
  .catch((err) => {console.log(err)})
};
