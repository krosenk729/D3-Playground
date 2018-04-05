const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");

// =============================================================
// Setting up server / app 

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const app = require('../app');
// const Article = require('../src/models/Article');

// =============================================================
// Setting up chai

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// https://github.com/samuxyz/bookstore

describe("Scrapes", function() {
  describe("/GET /api/rnto", function(){

    it("should get all articles from Reddit Not The Onion", function(done) {
      chai.request(app)
      .get("/api/rnto")
      .end((err, res)=>{
          // console.log(err, res);
          res.should.have.status(200);
          res.statusCode.should.equal(200);

          res.body.to.not.be.false;
          // res.body.should.be.a('array');
          // res.body.length.should.be.at.least(1);

          done();
        });

    });
  });
  describe("/GET /api/to", function(){

    it("should get articles from The Onion", function() {
      expect(true).to.equal(true);
    });

  });
});

describe("Saved", function() {
  describe("/GET /saved", function(){

    it("should get saved articles", function() {});
    it("should get saved articles with comments populated", function() {});

  });

  describe("/POST /article", function(){

    it("should respond with saved article", function() {});

  });

  describe("/GET /article/:id", function(){

    it("should get saved article", function() {});
    it("should get saved article with comments populated", function() {});

  });

});

describe("Comments", function() {
  describe("/POST /comment/:articleid", function(){

    it("should respond with saved comment", function() {});

  });

  describe("/PUT /comment/:commentid", function(){

    it("should update comment", function() {});

  });

  describe("/DELETE /comment/:commentid", function(){

    it("should remove comment", function() {});

  });

});