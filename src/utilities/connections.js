const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/Wanderlust_DB";

let userSchema = Schema({
    name: String,
    userId: String,
    emailId: String,
    contactNo: Number,
    password: String,
    bookings: [String]
}, { collection: "User" })

let bookingsSchema = Schema({
    bookingId: String,
    userId: String,
    destId: String,
    destinationName: String,
    checkInDate: { type: Date, default: new Date() },
    checkOutDate: Date,
    noOfPersons: Number,
    totalCharges: { type: Number, min: [0, "Charges cannot be less than 0"] },
    timeStamp: { type : Date, default: Date.now }
}, { collection: "Bookings" }
)
let DestinationsSchema = new Schema({
    "destinationId": String,
    "continent": String,
    "imageUrl": String,
    "name": String,
    "details": {
        type: {
            "about": String, "itinerary": {
                type: {
                    "dayWiseDetails": {
                        type: {
                            "firstDay": String,
                            "restDaysSightSeeing": [String], "lastDay": [String]
                        }
                    }, "packageInclusions": [String], "tourHighlights": [String],
                    "tourPace": [String]
                }
            }
        },
    },
    "noOfNights": Number,
    "flightCharges": Number,
    "chargesPerPerson": Number,
    "discount": Number,
    "availability": Number

}, { collection: "Destinations" })

let HotDealsSchema = new Schema({
    "destinationId": String,
    "continent": String,
    "imageUrl": String,
    "name": String,
    "details": {
        type: {
            "about": String, "itinerary": {
                type: {
                    "dayWiseDetails": {
                        type: {
                            "firstDay": String,
                            "restDaysSightSeeing": [String], "lastDay": [String]
                        }
                    }, "packageInclusions": [String], "tourHighlights": [String],
                    "tourPace": [String]
                }
            }
        },
    },
    "noOfNights": Number,
    "flightCharges": Number,
    "chargesPerPerson": Number,
    "discount": Number,
    "availability": Number

}, { collection: "HotDeals" })


let collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('User', userSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getBookingsCollection=()=>{
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Bookings',bookingsSchema )
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getDestinationsCollection=()=>{
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Destinations',DestinationsSchema )
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getHotdealsCollection=()=>{
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('HotDeals',HotDealsSchema )
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}


module.exports = collection;
