const mongoose = require('mongoose');
const schema = require('./schema');
const model = mongoose.model('architect', schema);

module.exports = model;