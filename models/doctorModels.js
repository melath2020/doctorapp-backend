const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var doctorSchema = new mongoose.Schema({
    userId:{
        type:String,
        
    },
    firstname:{
        type:String,
        required:[true,'first name is required'],
    
    },
    lastname:{
        type:String,
        required:[true,'last name is required']
        
    },
   
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    email:{
        type:String,
        required:[true,'phone number is required']
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    specialization:{
        type:String,
        required:[true,'specialization is required']
    },
    experience:{
        type:String,
        required:[true,'experiance is required']
    },
    feesPercunsaltation:{
        type:Number,
        required:[true,'fee is required']
    },
    status:{
        type:String,
        default:'pending'
    },
    // timings:{
    //     type:Object,
    //     required:[true,'work timing is required']
    // },
},{
    timestamps:true
});

const doctorModel=mongoose.model('doctors', doctorSchema);
//Export the model
module.exports = doctorModel
