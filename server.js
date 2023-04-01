const express = require('express');
const colors = require('colors');
const morgon = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes= require('./routes/userRoutes');
const adminRoutes= require('./routes/adminRoutes');
const doctorRoutes= require('./routes/doctorRoutes');
const cors = require("cors");
// dotenv config
dotenv.config()

// Mongodb Connection
connectDB();

// rest object 
const app =express()

// middlewares
app.use(express.json())
app.use(morgon('dev'))
app.use(cors());
// routes

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/doctor',doctorRoutes)


const port= process.env.PORT || 8080
// listen

app.listen(port,()=>{
    console.log(`server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
})