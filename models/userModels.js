const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
        
    },
    email:{
        type:String,
        required:[true,'email is required']
    
    },
    password:{
        type:String,
        required:[true,'password reuired']
    },
    isAdmin:{
        type:Boolean,
        default:false

    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[],

    },
    seennotification:{
        type:Array,
        default:[]
    }
});

const userModel=mongoose.model('users', userSchema);
//Export the model
module.exports = userModel