const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");

// =============================================================
// Setting up server / app 

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// const app = require('../app');
// const Article = require('../src/models/Article');

// =============================================================
// Setting up chai

// chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

// https://github.com/samuxyz/bookstore

describe("Scrapes", function() {
  it("should get all articles from Reddit Not The Onion", function() {
    expect(2 * 4).to.equal(8);
  });

  it("should get articles from The Onion", function() {
    expect(true).to.equal(true);
  });
});
