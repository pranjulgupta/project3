const userDB = require('../model/userslogin');
const beanClass = require('../model/beanClasses/users');
const beanClass1=require('../model/beanClasses/booking');
const validator = require("../utilities/validator")

const userService = {}
userService.registerUser = (userDetails) => {
    let userDetail = new beanClass(userDetails)
    validator.validateEmail(userDetails.emailId)
    validator.validateContactNo(userDetails.contactNo)
    return userDB.registerUser(userDetail).then((res) => {
        if (res) {
            return res
        }
        else {
            let err = new Error("Already Registered User")
            err.status = 404
            throw err
        }
    }

    )
}

userService.bookPackage = (bookingData) => {
    let userDetail = new beanClass1(bookingData)
    return userDB.bookPackage(userDetail).then((res) => {
        if (res) {
            return res
        }
        else {
            let err = new Error("Booking Can Not Be Done")
            err.status = 404
            throw err
        }
    }

    )
}

userService.getViewBooking = (userId) => {
    return userDB.getViewBooking(userId).then((res) => {
        if (res) {
            return res
        }
        else {
            let err = new Error("No Booking Found For Your Account")
            err.status = 404
            throw err
        }
    })
}

userService.getCancleBooking = (bookingId,userId) => {
    return userDB.getCancleBooking(bookingId,userId).then((res) => {
        
        if (res) {
            return res
        }
        else {
            let err = new Error("No Booking Found ")
            err.status = 404
            throw err
        }
    })
}

userService.getHotDeals = () => {
    return userDB.getHotDeals().then((res) => {
        if (res) {
            return res
        }
        else {
            let err = new Error("HotDeals Not Found")
            err.status = 404
            throw err
        }
    })
}

userService.getDestination = () => {
    return userDB.getDestination().then((res) => {
        if (res) {
            return res
        }
        else {
            let err = new Error("Destination Not Found")
            err.status = 404
            throw err
        }
    })
}


userService.checkUser = (email) => {
    return userDB.checkUserByEmail(email).then((res) => {
        if (res) {
            return res
        }
        else {
            let err = new Error("Email Not Registered")
            err.status = 404
            throw err
        }
    })
}
//login a user
userService.login = (contactNo, userPassword) => {
    return userDB.checkUser(contactNo).then((user) => {
        if (user == null) {
            let err = new Error("Enter registered contact number! If not registered, please register")
            err.status = 404
            throw err
        }
        else {
            return userDB.getPassword(contactNo).then((password) => {
                if (password != userPassword) {
                    let err = new Error("Incorrect password")
                    err.status = 406
                    throw err
                }
                else {
                    return user;
                }
            })
        }
    })
}


module.exports = userService
