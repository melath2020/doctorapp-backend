

const express=require('express');
const { loginController, registerController, authController, applyDoctorController } = require('../controller/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router=express.Router()

router.post('/login',loginController)
router.post('/register',registerController)
router.post('/getUserData',authMiddleware,authController)
router.post('/apply-doctor',authMiddleware,applyDoctorController)


module.exports=router