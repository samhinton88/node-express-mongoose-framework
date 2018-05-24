exports.giveNames = (name) => {
  return {
    camelToken: camelCase(name),
    classToken: capitalise(name),
    pluralToken: camelCase(name) + 's'
  }
}

function camelCase(string) {

  const processedStr = string
    .split('_')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('');

  return processedStr.charAt(0).toLowerCase() + processedStr.slice(1);
}

function capitalise(string) {
  return string
    .split('_')
    .map((word) => {
      console.log(word)
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('');
}
