const {
  writeConfig,
  commandMap,
  commands,
  methodMap,
  generateNames,
  generateCrudActions
} = require('../../src/utils/write/routes');

const CLI = require('../../src/interface');

console.log('generateCrudActions', typeof generateCrudActions)

describe('Route generation', () => {
  let routesConfig, inputConfig;
  const command  = '/usr/local/bin/node /Users/samhinton/code/samhinton88/node-express-mongoose-framework/ create resource architect firstName:S,r lastName:S,r isClient:BOOL,d[false] qualifications:ref[qualification] wage:N,d[0] locale:S,d[GB] -C'.split(' ');

  const routesTemplate = `app.get('/architects/', requireUserAuth, architectController.all);
app.post('/architects/', requireUserAuth, architectController.new);
app.get('/architects/:id', requireUserAuth, architectController.find);
app.put('/architects/:id', requireUserAuth, architectController.update);
app.delete('/architects/:id', requireUserAuth, architectController.destroy);`;

  beforeEach(() => {
    inputConfig = CLI(command);
    inputConfig.generateNames = generateNames;
    inputConfig.generateCrudActions = generateCrudActions;
    inputConfig.generateNames();
    inputConfig.generateCrudActions();
  })


  it('functions', () => {

    inputConfig.middleware = ['requireUserAuth'];

    const routeString = commands
                        .map((c) => methodMap.expressRoute(inputConfig, commandMap[c]))
                        .join('\n');
    expect(routeString).toBe(routesTemplate)
  })

  it('uses a config object', () => {

    const all = methodMap.all(inputConfig);
    const controller = methodMap.buildController(inputConfig)

    console.log(inputConfig)
  })
})


