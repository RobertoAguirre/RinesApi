const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRoutes');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const rimsRouter = require('./routes/rimsRoutes');
const brandsRouter = require('./routes/brandRoutes');
const printerRouter = require('./routes/printerRoutes');


const app = express();

app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.static(`${__dirname}/public`));

app.set('jwtkey', process.env.JWT_KEY);
app.use(cors());
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE,PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin', 'X-Api-Key', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization');
    next();
});




app.use((req,res, next)=>{
    console.log("hello from the middleware");
    next();
})

app.use((req,res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

//3)routes 
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/rims',rimsRouter);
app.use('/api/v1/brands',brandsRouter);
app.use('/api/v1/print',printerRouter);

/* app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    next();
}); */

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(con => {
    console.log(con.connections);
    console.log("Db connection successfull!");
});


//4) start server
const port = 3000;
app.listen(port,()=>{
    console.log(`app running on port ${port}`);
}) 

