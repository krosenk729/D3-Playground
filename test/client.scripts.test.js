const chai = require("chai");

// =============================================================
// Setting up scripts to be tested

const client = require("../src/client/scripts");

// =============================================================
// Setting up chai

const assert = chai.assert;

describe("getAllAlphabet", function(){

  it("should return an object", () => {
    assert.isObject(client.getAllAlphabet("Hello World"));
  });

  it("should have one property per letter of the alphabet", () => {
  	assert.hasAllKeys(client.getAllAlphabet("Hello World"), 'ABCDEFHIJKLMNOPQRSTUVWXYZ'.split(''));
  });

  it("should count the number of letters in a string", () => {
  	assert.containsAllKeys(client.getAllAlphabet("Hello"), {"H": 1,"E": 1, "L": 2, "O": 1});
  	assert.containsAllKeys(client.getAllAlphabet("AAABBBbbbccc"), {"A": 3,"B": 6, "C": 3});
  });

  it("should be stable regardless of inputs", () => {
  	assert.isOk(client.getAllAlphabet(""), "Empty input");
  	assert.isOk(client.getAllAlphabet("123123"), "Number input");
  	assert.isOk(client.getAllAlphabet("<#@!"), "Special character input");
  });

});