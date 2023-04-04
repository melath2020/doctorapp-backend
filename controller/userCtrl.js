const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken');
const doctorModel = require('../models/doctorModels');
const appointmentModel = require('../models/appointmentModel');
const moment = require('moment/moment');
// register
const registerController=async(req,res)=>{
    try{
        const existingUser=await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({message:'user already exist',success:false})
        }
        const password=req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt)
        req.body.password=hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:'Register successfully' ,success:true})
    }catch(error){
        console.log(error)
        res.status(500).send({success:false,message:`Register Controller ${error.message}`})
    }
}

const loginController = async(req,res)=>{
   try{
    const user= await userModel.findOne({email:req.body.email})
    if(!user){
        return res.status(200).send({message:'user not found',success:false})
    }
    const isMatch =await bcrypt.compare(req.body.password,user.password)
    if(!isMatch){
        return res.status(200).send({message:'invalid Email or password', success:false})
    }
    const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.status(200).send({message:'Login success',success:true,token})
   }catch(error){
    console.log(error)
    res.status(500).send({message:`Error in login Ctrl ${error.message}`})
   }
}

const authController=async(req,res)=>{
        try{
            const user = await userModel.findById({_id:req.body.userId})
            user.password=undefined;
            if(!user){
                return res.status(200).send({
                    message:'user not found',
                    success:false
                })
            }else{
                res.status(200).send({
                    success:true,
                    data:user
                })
            }
        }catch(error){
            res.status(500).send({
                message:'auth error',
                success:false,
                error
            })
        }
}

const applyDoctorController =async(req,res)=>{
    try{
        const newDoctor = await doctorModel({...req.body,status:'pending'})
        await newDoctor.save()
        const adminUser= await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message:`${newDoctor.firstname} ${newDoctor.lastname} has applied or a doctor account`,
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstname + "" + newDoctor.lastname,
                onclickPath:'/admin/doctors'

            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({
            success:true,
            message:'Doctor account Applied Successully'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while apply for doctor'
        })
    }
}


const getAllNotificationController = async(req,res)=>{
try{
    
    const user = await userModel.findOne({_id:req.body.userId})
    const seennotiication = user.seennotification
    const notification = user.notification
    seennotiication.push(...notification)
    user.notification=[]
    user.seennotification = notification
    const updatedUser =await user.save()
    res.status(200).send({
        success:true,
        message:'all notification marked as read',
        data:updatedUser,
    })

}catch(error){
    console.log(error)
    res.status(500).send({
        message:'Error in Notification',
        success:false,
        error
    })
}
}


const deleteAllNotificationController=async(req,res)=>{
    try{
        const user =await userModel.findOne({_id:req.body.userId})
        user.notification=[]
        user.seennotification=[]
        const updatedUser =await user.save()
        updatedUser.password=undefined
        res.status(200).send({
            success:true,
            message:'Notiications Deleted Successfully',
            data:updatedUser

        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'unable to delete all notiications',
            error
        })
    }
}

const getAllDoctorController=async(req,res)=>{
   try{
    const doctors = await doctorModel.find({status:'approved'})
    res.status(200).send({
        success:true,
        message:'Doctor list feched success',
        data:doctors
    })
   }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error while fetching doctor'
    })
   }
}

const bookAppointmentController=async(req,res)=>{
    try{
        req.body.date=moment(req.body.date,'DD-MM-YYYY').toISOString()
        req.body.time=moment(req.body.time,'HH:mm').toISOString();
        req.body.status='pending'
        const newAppointment= new appointmentModel(req.body)
        await newAppointment.save()
        const user=await userModel.findOne({_id:req.body.doctorInfo.userId})
        user.notification.push({
            type:'New-Appointment-request',
            message:`A new appointment request from ${req.body.userInfo.name}`,
            onclickPath:'/user/appointments'
        })
        await user.save()
        res.status(200).send({
            success:true,
            message:'Appointment book successfully'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While booking appointment'
        })
    }
}

const bookingAvailiabilityController=async(req,res)=>{
    try{
        const date=moment(req.body.date,'DD-MM-YYYY').toISOString()
        const fromTime=moment(req.body.time,'HH:mm').subtract(1,'hours').toISOString()
        const toTime=moment(req.body.time,'HH:mm').add(1,'hours').toISOString()
        const doctorId=req.body.doctorId
        const appointments= await appointmentModel.find({doctorId,date,time:{
            $gte:fromTime,
            $lte:toTime
        }})
        if(appointments.length > 0){
            return res.status(200).send({
                message:'Appointments is not availiable at this time',
                success:true
            })
        }else{
            return res.status(200).send({
                success:true,
                message:'Appointments availiable'
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Booking'
        })
    }
}





module.exports={loginController,registerController,authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController,getAllDoctorController,bookAppointmentController,bookingAvailiabilityController};