const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware');
const { getDoctorInfoController } = require('../controller/doctorCtrl');

const router = express.Router()

router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)


module.exports =router