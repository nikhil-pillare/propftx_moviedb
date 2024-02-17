const express = require('express');
const mongoose = require('mongoose');
const movieRouter = require('./routes/movie.route')
const userRouter = require('./routes/user.route')
require("dotenv").config();
var cors = require('cors')
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204,
  };
app.use(express.json(corsOptions));
app.use(cors())

app.use("/user", userRouter)
app.use('/movies', movieRouter);

app.listen(process.env.PORT, async() => {
        try {
            mongoose.connect(process.env.MONGOURL)
            console.log('server started and database connect'); 
        } catch (error) {
           console.log(error); 
        }
});