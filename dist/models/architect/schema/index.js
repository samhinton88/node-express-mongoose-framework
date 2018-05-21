const { Schema } = require('mongoose');
const methods = require('./methods');
const schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	isClient: { type: Boolean, default: false },
	buildings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'building' }],
	wage: { type: Number, default: 0 },
	locale: { type: String, default: 'GB' },
});

module.exports = schema;