const userDetails = require('./beanClasses/users');
const connection = require("../utilities/connections")

const usersDB = {}

usersDB.getDestination = () => {
    return connection.getDestinationsCollection().then((collection) => {
        return collection.find({}, { _id: 0 }).then((res) => {
            if (res) {
                return res
            }
            else {
                return null
            }
        })
    })
}

usersDB.getHotDeals = () => {
    return connection.getHotdealsCollection().then((collection) => {
        return collection.find({}, { _id: 0 }).then((res) => {
            if (res) {
                return res
            }
            else {
                return null
            }
        })
    })
}

usersDB.generateId = () => {
    return connection.getUserCollection().then((collection) => {
        return collection.distinct("userId").then((ids) => {
            let id = ids[ids.length - 1]
            let id1 = ""
            for (i = 1; i < id.length; i++)
                id1 += id[i]
            id2 = Number(id1)
            return 'U' + String(id2 + 1)

        })
    })
}

usersDB.generateBookingId = () => {
    return connection.getBookingsCollection().then((collection) => {
        return collection.distinct("bookingId").then((ids) => {
            let id = ids[ids.length - 1]
            let id1 = ""
            for (i = 1; i < id.length; i++)
                id1 += id[i]
            id2 = Number(id1)
            return 'B' + String(id2 + 1)

        })
    })
}

usersDB.getViewBooking = (userId) => {
    return connection.getBookingsCollection().then((collection) => {
        return collection.find({ "userId": userId }).then((res) => {
            if (res.length>0) {
                return res
            }
            else return null;
        })
    })
}

usersDB.getCancleBooking = (bookingId, userId) => {
    return connection.getBookingsCollection().then((collection) => {
        return collection.deleteOne({ "bookingId": bookingId }).then((res) => {
            return connection.getUserCollection().then((model)=>{
              return  model.updateOne({userId:userId},{ $pull: { bookings: bookingId  } }, { runValidators: true }).then((resp) => {
                    if (resp.nModified > 0) {
                        
                        return usersDB.getViewBooking(userId).then((response)=>{
                            
                            return response
                        })
                        }
                        else return null
                })
            })    
        })
    })
}

usersDB.bookPackage=(packageData)=>{
    return connection.getBookingsCollection().then((model)=>{
        return usersDB.generateBookingId().then((bookId) =>{
            packageData.bookingId=bookId
            return model.insertMany([packageData]).then((data)=>{
                if(data.length!=0){
                    return connection.getUserCollection().then((model1)=>{
                        return model1.updateOne({userId:packageData.userId},{ $push: { bookings: bookId } }, 
                            { runValidators: true }).then((res)=>{
                                if(res.nModified > 0){
                                    return bookId
                                }
                                else{
                                    return null
                                }
                            })
                    })
                }
                else{
                    return null
                }
            })
        })
    })
}

usersDB.registerUser = (userDetails) => {
    return connection.getUserCollection().then((model) => {
        return usersDB.checkUserByEmail(userDetails.emailId).then((res) => {
            if (!res) {
                return usersDB.generateId().then((newUserId) => {
                    userDetails.userId = newUserId;
                    return model.insertMany([userDetails]).then((data) => {
                        if (data.length != 0) {
                            return userDetails
                        } else {
                            return null
                        }
                    })
                })
            }
            else { return null }
        })
    })
}
usersDB.checkUser = (contactNo) => {
    return connection.getUserCollection().then((collection) => {
        return collection.findOne({ "contactNo": contactNo }).then((customerContact) => {
            if (customerContact) {
                return new userDetails(customerContact);
            }
            else return null;
        })
    })
}

usersDB.checkUserByEmail = (email) => {
    return connection.getUserCollection().then((collection) => {
        return collection.findOne({ "emailId": email }).then((customerContact) => {
            if (customerContact) {
                return new userDetails(customerContact);
            }
            else return null;
        })
    })
}

usersDB.getPassword = (contactNo) => {
    return connection.getUserCollection().then((collection) => {
        return collection.find({ "contactNo": contactNo }, { _id: 0, password: 1 }).then((password) => {
            if (password.length != 0)
                return password[0].password;
            else
                return null;
        })
    })
}



module.exports = usersDB;
