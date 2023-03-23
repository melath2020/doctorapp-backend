

const express=require('express');
const { loginController, registerController, authController } = require('../controller/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router=express.Router()

router.post('/login',loginController)
router.post('/register',registerController)
router.post('/getUserData',authMiddleware,authController)

module.exports=router