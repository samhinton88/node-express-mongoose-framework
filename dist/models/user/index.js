const mongoose = require('mongoose');
const schema = require('./schema');
const model = mongoose.model('user', schema);

module.exports = model;