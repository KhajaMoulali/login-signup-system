const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('note', noteSchema);
