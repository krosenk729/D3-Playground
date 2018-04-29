const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");

// =============================================================
// Setting up server / app 

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const app = require('../app');

// =============================================================
// Setting up chai

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe("Colors", function() {
  describe("/GET /api/colors", function(){

    it("should get gradient color pairs", function(done) {
      chai.request(app)
      .get("/api/colors")
      .end((err, res)=>{
          res.should.have.status(200);
          res.statusCode.should.equal(200);

          done();
        });
    });


    it("should be shaped as an Array of n=2 Arrays of color values", function() {
      chai.request(app)
      .get("/api/colors")
      .end((err, res)=>{
          res.body.should.be.a('array');

          res.body.length.should.be.at.least(1);

          res.body[0].length.should.be(2);

          res.body[0][0].match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/).to.be.true;
          res.body[0][1].match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/).to.be.true;

          done();
        });
    });
  });

});

describe("Trends", function() {
  describe("/GET /api/trends", function(){

    it("should get a list of articles", function() {
      chai.request(app)
      .get("/api/trends")
      .end((err, res)=>{
          res.should.have.status(200);
          res.statusCode.should.equal(200);

          res.body.to.not.be.false;
          done();
        });      
    });


    it("should get list characteristics about the articles", function() {
      chai.request(app)
      .get("/api/trends")
      .end((err, res)=>{
          res.body.should.be.a('array');

          res.body.length.should.be.at.least(1);

          res.body[0].to.be.an('object');

          res.body[0].to.have.property('text').that.is.a('string');
          res.body[0].to.have.property('vowels').that.is.a('number');
          res.body[0].to.have.property('consonants').that.is.a('number');
          res.body[0].to.have.property('caps').that.is.a('number');
          res.body[0].to.have.property('lowers').that.is.a('number');
          res.body[0].to.have.property('katherines').that.is.a('number');
          res.body[0].to.have.property('extras').that.is.a('number');
          res.body[0].to.have.property('nums').that.is.a('number');

          done();
        });  
    });

  });

  describe("/POST /api/trends", function(){

    it("should return an error because we don't have post routes", function() {
      chai.request(app)
      .post("/api/trends")
      .end((err, res)=>{
          res.should.have.status(404);
          res.statusCode.should.equal(404);

        });      
    });
  });

});
