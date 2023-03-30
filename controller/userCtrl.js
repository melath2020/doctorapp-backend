const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken');
const doctorModel = require('../models/doctorModels');
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




module.exports={loginController,registerController,authController,applyDoctorController};