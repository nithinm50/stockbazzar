const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    symbol:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Stock', stockSchema);