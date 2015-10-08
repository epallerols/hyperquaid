"use strict";

var _ = require("lodash");
var chai = require("chai");
var expect = chai.expect;
var supertest = require("supertest");
var config = require("../etc/conf");
var MongoDbConnection = require("./../../lib/services/mongoDb");
var QA = require("./../../lib/models").QA;

chai.use(require("chai-as-promised"));
var api = supertest(config.host + ":" + config.port);

before(() => {
  MongoDbConnection.connect((error) => {
    if (error) {
      throw error;
    }
  });
});

afterEach((done) => {
  QA.remove({}, () => {
    done();
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
        expect(result.body._links.self).to.deep.equal({
          href: "/"
        });
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

    it("contains a link to that qaid", (done) => {
      api.get("/")
        .end((error, result) => {
          var qaidLink = result.body._links["hack:qaid"];

          expect(qaidLink).to.eql({
            href: "/" + qa._id
          });
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
            var qaidLinkArray = result.body._links[
              "hack:qaid"];

            expect(qaidLinkArray[0]).to.eql({
              href: "/" + qa._id
            });
            expect(qaidLinkArray[1]).to.eql({
              href: "/" + anotherQa._id
            });
            done();
          });
      });
    });
  });
});

describe("POST /", () => {
  var newQaid = {
    approved: true
  };

  it("redirects to the new qaid", (done) => {
    api.post("/")
    .send(newQaid)
    .end((error, result) => {
      expect(result.status).to.equal(302);
      QA.findOne().then((quaid) => {
        expect(_.trimLeft(result.headers.location, "/")).to.eql(quaid._id.toString());
        done();
      });
    });
  });

  it("created a new qaid", () => {
    api.post("/")
    .send(newQaid)
    .end((error, result) => {
      return expect(QA.count({})).to.eventually.equal(1);
    });
  });
});
