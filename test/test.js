const assert = require("chai").assert
const validator = require('../src/utilities/validator')
const chaiHttp = require("chai-http")
const should=require('chai').should()
const chai =require("chai")
describe("validate email",function(){
    it("should throw Error Invalid EmailId", function(){
        assert.throws(()=>{ validator.validateEmail("abcd") }, Error, "Invalid EmailId")
    })
    it("shoud return true", function(){
        assert.equal(validator.validateEmail("ab@gmail.com") , true)
    })
})

describe("validate constant",function(){
    it("should throw Error Invalid Contact number", function(){
        assert.throws(()=>{ validator.validateContactNo(987654) }, Error, "Invalid Contact Number")
    })
    it("shoud return true", function(){
        assert.equal(validator.validateContactNo(9865756420) , true)
    })
})

chai.use(chaiHttp)
describe("router testing",()=>{
    it("should return destination data",(done)=>{
        chai.request("http://localhost:4000/package").get("/hotDeals").send().end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a("array")
            // res.body.should.have.property("destinationId")
            done()
        })
    })
})

describe("router testing",()=>{
    it("should return destination data",(done)=>{
        chai.request("http://localhost:4000/package").get("/destination").send().end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a("array")
            done()
        })
    })
})