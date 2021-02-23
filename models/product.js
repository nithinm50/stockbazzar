const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required:true
    },
    imageUrl:{
        type: String,
        required: true
    },
    excerpt:{
        type: String,
        required: true
    },
    
})