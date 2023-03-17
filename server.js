const express = require('express');
const colors = require('colors');
const morgon = require('morgan');
const dotenv = require('dotenv');
// dotenv config
dotenv.config()

// rest object 
const app =express()

// middlewares
app.use(express.json())
app.use(morgon('dev'))

// routes

app.get('/',(req,res)=>{
    res.status(200).send({
        message:"Server Running"
    })
})

const port= process.env.PORT || 8080
// listen

app.listen(port,()=>{
    console.log(`server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
})