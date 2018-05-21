const app = require('./src/app');
const CLI = require('./src/interface');

const input = CLI(process.argv);

app(input);
