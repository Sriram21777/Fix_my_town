require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require("cors");
const userRoute= require('./routes/user');
const reportRoute = require('./routes/reports');
const zoneRoute = require('./routes/zone');
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("Server is running properly")
})

app.use('/api/users',userRoute);
app.use('/api/reports', reportRoute);
app.use('/api/zone', zoneRoute);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection
database.on('error',(error)=>{
    console.log(error);
})
database.once('connected',()=>{
    console.log('Database Connected');
})

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`)
})





