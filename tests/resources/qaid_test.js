"use strict";

var expect = require("chai").expect;
var supertest = require("supertest");
var api = supertest("http://hyperquaid.works.com");
var MongoDbConnection = require("./../../lib/services/mongoDb");
var QA = require("./../../lib/models").QA;

before(() => {
  MongoDbConnection.connect((error) => {
    if (error) {
      throw error;
    }
  });
});

describe("GET /", () => {
  it("returns a 200 status", (done) => {
    api.get("/")
    .expect(200, done);
  });

  it("contains a link to self", (done) => {
    api.get("/")
    .end((error, result) => {
      expect(result.body._links.self).to.deep.equal({ href: "/"});
      done();
    });
  });

  it("does not contain a qaid array", (done) => {
    api.get("/")
    .end((error, result) => {
      var links = result.body._links;

      expect(links).to.not.have.property("hack:qaid");
      done();
    });
  });

  context("when a qaid exists", () => {
    var qa;

    beforeEach((done) => {
      qa = new QA();
      qa.save(() => {
        done();
      });
    });

    afterEach((done) => {
      QA.remove({}, () => {
        done();
      });
    });

    it("contains a link to that qaid", (done) => {
      api.get("/")
      .end((error, result) => {
        var qaidLink = result.body._links["hack:qaid"];

        expect(qaidLink).to.eql({ href: "/" + qa._id});
        done();
      });
    });

    context("when another quaid exists", () => {
      var anotherQa;

      beforeEach((done) => {
        anotherQa = new QA();
        anotherQa.save(() => {
          done();
        });
      });

      it("contains links to both qaids", (done) => {
        api.get("/")
        .end((error, result) => {
          var qaidLinkArray = result.body._links["hack:qaid"];

          expect(qaidLinkArray[0]).to.eql({ href: "/" + qa._id});
          expect(qaidLinkArray[1]).to.eql({ href: "/" + anotherQa._id});
          done();
        });
      });
    });
  });
});
