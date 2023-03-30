

const express=require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController } = require('../controller/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router=express.Router()

router.post('/login',loginController)
router.post('/register',registerController)
router.post('/getUserData',authMiddleware,authController)
router.post('/apply-doctor',authMiddleware,applyDoctorController)
router.post('/get-all-notiication',authMiddleware,getAllNotificationController)
router.post('/delete-all-notiication',authMiddleware,deleteAllNotificationController)

module.exports=router