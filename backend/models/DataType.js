const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    type: String,
    content: Object
});

module.exports = mongoose.model('DataType', dataSchema);
