const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const http = require("http");
dotenv.config({ path: './config.env' });
const Rim = require('./routes/authRoutes');

//const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const DB = process.env.DATABASE_LOCAL;

//for connecting to the local database: mongoose.connect(print.env.DATABASE_LOCAL, {

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(con => {
    console.log(con.connections);
    console.log("Db connection successfull!");
});

const tourSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,'A tour must have a name'], //with this you set that the name is required and set the error in case is not provided "a tour must have a name"
        unique:true
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required: [true,'A tour must have a price']
    }
});

const Tour = mongoose.model('Tour',tourSchema);

const testTour = new Tour({
    name: 'The Forest Hiker',
    rating:4.7,
    price: 497
})

//testTour.save();
/* 
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app running on port ${port}...`);

}); */