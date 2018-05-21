const mongoose = require('mongoose');
const schema = require('./schema');
const model = mongoose.model('null', schema);

module.exports = model;