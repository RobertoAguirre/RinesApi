const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


const rimSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: [true, 'A rim must have a sku'] //with this you set that the name is required and set the error in case is not provided "a tour must have a name"
    },
    modelname: {
        type: String,
        required: [true, 'A rim must have a model name'] //with this you set that the name is required and set the
    },
    description: {
        type: String,
        required: [true, 'A rim must have a description'] //with this you set that the description is required and set the error
    },
    partsupl: {
        type: String,
        required: [true, 'A rim must have a brand'] 
    },
    serial:{
        type: String,
        required: [true, 'A rim must have a brand'] 
    },
    datemfg:{
        type: Date,
        required: [false, 'A rim must have a brand'] 
    },
    qty: {
        type: Number,
        required: [true, 'A rim must have a quantity']
    },
    brand: {
        type: String,
        required: [true, 'A rim must have a brand'] //with this you set that the brand
    },
    labelColor: {
        type: String,
        required: [true, 'A rim must have a label color'] //with this you set that the brand
    },
    brandlogo: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Rim', rimSchema);