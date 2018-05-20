const CLI = require('../../../src/interface');

describe.only('create resource', () => {
  const input = [ '/usr/local/bin/node', '/Users/samhinton/code/samhinton88/node-express-mongoose-framework/index.js', 'create', 'resource', 'user']



  test('create resource user populates a config object for a user', () => {
    expect(CLI(input).name).toEqual('user');
  });

  test('resource config has a props prop by default', () => {
    expect(CLI(input).props).not.toBeUndefined();
  })

  test('a token following the name of a resource is a prop name', () => {
    input.push('createdAt');
    expect(CLI(input).props[0].propName).toEqual('createdAt');
  })

  test('config is stored against new props', () => {
    input.pop();
    input.push('createdAt:D,r');
    expect(CLI(input).props[0]).toEqual({propName: 'createdAt', required: true, type: Date})
  })

  test('stores multiple props with config', () => {
    input.push('firstName:S,r');
    const [cA, fN] = CLI(input).props;
    expect(cA).toEqual({propName: 'createdAt', required: true, type: Date});
    expect(fN).toEqual({propName: 'firstName', required: true, type: String});
  })

  test('-C indicates that the constructor should make a controller for the resource', () => {
    input.push('-C');
    expect(CLI(input).controller).toEqual({type: 'CRUD'})
  })

  test('a ref option should store a reference to another resource both on prop and parent config object', () => {
    console.log(input)
    input.push('blogs:ref[blog]');
    expect(CLI(input).refs.length).toBe(1);
    expect(CLI(input).refs[0]).toEqual({ refName: 'blog', rel: 'hasMany'})
  })

  test('a plural prop name produces prop config.type stored in an array', () => {
    input.push('tags:S');
    const { props } = CLI(input);
    expect(Array.isArray(props[props.length - 1].type));
    expect(props[props.length - 1].type[0]).toBe(String);
  })

  test('a d[<token>] sets a default value', () => {
    input.push('countryCode:S,d[GB]');
    const { props } = CLI(input)
    expect(props[props.length - 1].default).toBe('GB');
  })

  test('a boolean defaulted to false is properly stored as a primitive type',() => {
    input.push('isClient:BOOL,d[false]');
    const { props } = CLI(input)
    expect(props[props.length - 1].default).toEqual(false);
  })

  test('-cache will indicate that the resources controller should implement query caching', () => {
    input.push('-cache');
    expect(CLI(input).controller.shouldCache).toEqual(true);
  })

})
