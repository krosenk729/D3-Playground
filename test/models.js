const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");

// =============================================================
// Setting up models to be tested

const {Article, Comment} = require("../src/models");

// =============================================================
// Setting up chai

const expect = chai.expect;

// https://github.com/samuxyz/bookstore

describe("Article", function(){

  it("should error if missing a title", (done) => {
    let a = new Article();
    a.validate((err)=>{
      expect(err.errors.title).to.exist;
      done();
    });
  });

  it("should not error if title is provided", (done) => {
    let a = new Article({title: "testing"});
    a.validate((err)=>{
      expect(err).to.be.null;
      done();
    });
  });

  it("should error if isOnion is not a boolean", (done) => {
    let a = new Article({title: "testing", isOnion: 123});
    a.validate((err)=>{
      expect(err).to.exist;
      done();
    });
  });

});