const express=require('express');
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controller/adminCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router=express.Router()

router.get('/getAllUsers',authMiddleware,getAllUsersController)
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)


module.exports=router