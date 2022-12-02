const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


const brandSchema = new mongoose.Schema({
    brand:{
        type:String,
        required: [true,'A brand must have a brandname'] //with this you set that the brand
    },
    brandlogo:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model('Brand',brandSchema);