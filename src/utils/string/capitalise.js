module.exports = function(string) {
  return string
    .split('_')
    .map((word) => {
      return word.charAt(0).toUpperCase() + string.slice(1)
    })
    .join('');
}
