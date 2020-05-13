let validator={}

validator.validateEmail = (email) => {
    if (!email.match(/^[A-z][A-z0-9.]+@[a-z]+\.[a-z]{2,3}$/)) {
        let err = new Error("Invalid EmailId")
        err.status = 406
        throw err
    }
    return true
}

validator.validateContactNo = (contactno) => {
    let phno=String(contactno)
    if (!phno.match(/^[1-9]\d{9}$/)) {
        let err = new Error("Invalid Contact Number")
        err.status = 406
        throw err
    }
    return true
}

module.exports = validator