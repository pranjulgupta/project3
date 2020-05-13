const express = require('express');
const router = express.Router();
const setupUser = require("../model/setupUser")
const userservice = require('../service/userslogin')

router.get("/destinationsetup", (req, res, next) => {
    setupUser.destinationSetup().then((data) => {
        res.send(data)
    }).catch(err => next(err));
})

router.get("/hotdealsetup", (req, res, next) => {
    setupUser.hotdealSetup().then((data) => {
        res.send(data)
    }).catch(err => next(err));
})
router.get('/hotDeals', (req, res, next) => {
    userservice.getHotDeals().then((data) => {
        res.json(data)
    }).catch(err => next(err))
})
router.get('/destination', (req, res, next) => {
    userservice.getDestination().then((data) => {
        res.json(data)
    }).catch(err => next(err))
})

module.exports = router;
