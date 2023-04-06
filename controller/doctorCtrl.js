const doctorModel = require("../models/doctorModels")
const appointmentModel = require('../models/appointmentModel');
const userModel = require("../models/userModels");


const getDoctorInfoController=async(req,res)=>{
    try{
        const doctor =await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:'doctor data fetch success',
            data:doctor
        })
    }catch{
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in fetching doctor details'
        })
    }

}

const updateProfileController=async(req,res)=>{
   try{
    const doctor= await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
    res.status(201).send({
        success:true,
        message:'Doctor Profile updated',
        data:doctor
    })

   }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Doctor Profile update Error'
    })
   }
}

const getDoctorByIdController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success:true,
            message:'Single Doc Info Fetch',
            data:doctor
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error In single doctor Info'
        })
    }
  
 }

 const doctorAppointmentsController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOne({ userId: req.body.userId });
      const appointments = await appointmentModel.find({
        doctorId: doctor._id,
      });
      res.status(200).send({
        success: true,
        message: "Doctor Appointments fetch Successfully",
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Doc Appointments",
      });
    }
  };

 const updateStatusController=async(req,res)=>{
    try{
        const {appointmentsId,status}=req.body
        const appointments=await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
         const user=await userModel.findOne({_id:appointments.userId})
         const notification=user.notification
        notification.push({
            type:'Status-updated',
            message:`Your Appointment has been updated ${status}`,
            onclickPath:'/doctor-appointments'
        })
        await user.save()
        res.status(200).send({
            success:true,
            message:'Appointment status updated'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Update Status'
        })
    }
    
    }
 




module.exports={getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentsController,updateStatusController}