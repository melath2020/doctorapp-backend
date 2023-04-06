

const express=require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorController, bookAppointmentController, bookingAvailiabilityController, userAppointmentsController } = require('../controller/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router=express.Router()

router.post('/login',loginController)
router.post('/register',registerController)
router.post('/getUserData',authMiddleware,authController)
router.post('/apply-doctor',authMiddleware,applyDoctorController)
router.post('/get-all-notiication',authMiddleware,getAllNotificationController)
router.post('/delete-all-notiication',authMiddleware,deleteAllNotificationController)
router.get('/getAllDoctors', authMiddleware,getAllDoctorController)
router.post('/book-appointnment',authMiddleware,bookAppointmentController)
router.post('/booking-availiability',authMiddleware,bookingAvailiabilityController)
router.get('/user-appointments',authMiddleware,userAppointmentsController)

module.exports=router