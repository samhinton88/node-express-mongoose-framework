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
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('');
}

exports.generateNames = function() {

  const { resourceName } = this;

  this.pluralResourceName = resourceName + 's';
  this.controllerName = camelCase(resourceName) + 'Controller';
  this.className = capitalise(resourceName);

  const { refs } = this;

  refs.forEach((r) =>  {
    const { rel, refName } = r;

    r.refNestedParamName  = `:${refName}Id`;
    r.controllerName      = camelCase(refName + 'Controller');
    r.pluralResourceName  = refName + 's';
    r.className           = capitalise(refName);
    r.actionName          = 'get' + capitalise(refName) + 's';
  });
}

exports.generateCrudActions = function() {

  const { controller } = this;

  switch (controller.type) {
    case 'CRUD':
      this.commands = ['all', 'new', 'find', 'update', 'destroy'];
      break

  }

  const { refs } = this;

  refs.forEach((r) => {
    const { rel, actionName } = r;

    if (rel === 'hasMany') {
      this.commands.push('getRel');
    }
  })

}



