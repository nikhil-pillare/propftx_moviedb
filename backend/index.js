const express = require('express');
const mongoose = require('mongoose');
const movieRouter = require('./routes/movie.route')
const userRouter = require('./routes/user.route')
require("dotenv").config();
var cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())

app.use("/user", userRouter)
app.use('/movies', movieRouter);

app.listen(process.env.PORT, async() => {
        try {
            mongoose.connect(process.env.MONGOURL)
            console.log('server started and database connected'); 
        } catch (error) {
           console.log(error); 
        }
});