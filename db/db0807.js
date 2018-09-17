var promise = require('bluebird');

var dbmethods = {};


dbmethods.getDB = function (){

  var options = {
      // Initialization Options
      promiseLib: promise
  };

  var pgp = require('pg-promise')(options);
  var connectionString = 'postgres://localhost:5433/crm';
  var db = pgp(connectionString);
  return db;


}

module.exports = dbmethods;
