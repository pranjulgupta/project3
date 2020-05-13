const express = require('express');
const router = express.Router();
const setupUser = require("../model/setupUser")
const userservice = require('../service/userslogin')


router.get("/bookingsetup", (req, res, next) => {
    setupUser.bookingSetup().then((data) => {
        res.send(data)
    }).catch(err => next(err));
})

router.post('/booking',function(req,res,next){
	userservice.bookPackage(req.body).then((data)=>{
		res.json(data)
}).catch(err=>next(err))
})

router.get('/viewBooking/:userId', (req, res, next) => {
    userservice.getViewBooking(req.params.userId).then((data) => {
        res.json(data)
    }).catch(err => next(err))
})

router.put('/cancleBooking/:bookingId/:userId', (req, res, next) => {
    userservice.getCancleBooking(req.params.bookingId,req.params.userId).then((data) => {
        res.json(data)
    }).catch(err => next(err))
})

//router to login



module.exports = router;

