const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    bio:{
        type: String
    },
    designation:{
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Profile', profileSchema);