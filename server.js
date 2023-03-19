const express = require('express');
const colors = require('colors');
const morgon = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes= require('./routes/userRoutes')
// dotenv config
dotenv.config()

// Mongodb Connection
connectDB();

// rest object 
const app =express()

// middlewares
app.use(express.json())
app.use(morgon('dev'))

// routes

app.use('/api/v1/user',userRoutes)

const port= process.env.PORT || 8080
// listen

app.listen(port,()=>{
    console.log(`server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
})