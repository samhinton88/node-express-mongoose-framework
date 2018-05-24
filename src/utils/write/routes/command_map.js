// config for routes on a per command basis

module.exports = {
  all:      { route: 'pluralResourceName', id: false, verb: 'get',    command: 'all'      },
  new:      { route: 'pluralResourceName', id: false, verb: 'post',   command: 'new'      },
  find:     { route: 'pluralResourceName', id: true,  verb: 'get',    command: 'find'     },
  update:   { route: 'pluralResourceName', id: true,  verb: 'put',    command: 'update'   },
  destroy:  { route: 'pluralResourceName', id: true,  verb: 'delete', command: 'destroy'  }
};
