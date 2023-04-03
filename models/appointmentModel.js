const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var appointmentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    doctorId:{
        type:String,
        required:true,
    },
    doctorInfo:{
        type:String,
        required:true,
    },
    userInfo:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:'pending'
    },
    time:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

//Export the model
appointmentModel = mongoose.model('appointments', appointmentSchema);

module.exports = appointmentModel;