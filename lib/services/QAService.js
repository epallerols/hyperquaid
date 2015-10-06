var QA = require("../models").QA;
module.exports = {
  getList: function getList(callback){
      return QA.find({}, function getData(error, docs) {
        if(error) {
          return callback(error);
        }

        return callback(null, docs);
      })
  }
};