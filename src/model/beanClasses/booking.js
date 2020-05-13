class Booking {
    constructor(obj) {
        this.bookingId=obj.bookingId
        this.userId=obj.userId
        this.destId=obj.destId
        this.destinationName=obj.destinationName
        this.noOfPersons=obj.noOfPersons;
        this.checkInDate=obj.checkInDate;
        this.checkOutDate=obj.checkOutDate
        this.totalCharges=obj.totalCharges
        this.timeStamp=obj.timeStamp
 
    }
}

module.exports = Booking;