const moongoose = require('mongoose');
const colors = require('colors')

const connectDB = async()=>{
    try{
        await moongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connected ${moongoose.connection.host}`.bgGreen.white)
    }catch(error){
        console.log(`Mongodb Server Issue ${error}`.bgRed.white)
    }
}

module.exports= connectDB;