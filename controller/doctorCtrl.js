const doctorModel = require("../models/doctorModels")

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
 


module.exports={getDoctorInfoController,updateProfileController,getDoctorByIdController}