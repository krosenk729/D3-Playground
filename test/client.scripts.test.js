const chai = require("chai");

// =============================================================
// Setting up scripts to be tested

const client = require("../client/scripts");

// =============================================================
// Setting up chai

const assert = chai.assert;

describe("getAllAlphabet", function(){

  it("should return an object", () => {
    assert.isObject(client.getAllAlphabet("Hello World"));
  });

  it("should have one property per letter of the alphabet", () => {

  });

  it("should count the number of letters in a string", () => {

  });

  it("should be stable regardless of inputs", () => {

  });

});