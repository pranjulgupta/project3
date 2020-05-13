const express = require('express');
const router = express.Router();
const setupUser = require("../model/setupUser")
const userservice = require('../service/userslogin')

router.get("/setup", (req, res, next) => {
    setupUser.userSetup().then((data) => {
        res.send(data)
    }).catch(err => next(err));
})

router.post('/register',function(req,res,next){
	userservice.registerUser(req.body).then((data)=>{
		res.json(data)
}).catch(err=>next(err))
})

router.post('/checkUser',function(req,res,next){
	let email=req.body.email;
	userservice.checkUser(email).then((data)=>{
		res.json(data)

}).catch(err=>next(err))
})

//router to login
router.post('/login', function (req, res, next) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    userservice.login(parseInt(contactNo), password).then(function (userDetails) {
        res.json(userDetails);
    }).catch(err => next(err));
})


module.exports = router;

