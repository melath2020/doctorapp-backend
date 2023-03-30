const express=require('express');
const { getAllUsersController, getAllDoctorsController } = require('../controller/adminCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router=express.Router()

router.get('/getAllUsers',authMiddleware,getAllUsersController)
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)


module.exports=router