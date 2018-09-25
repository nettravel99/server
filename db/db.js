var promise = require("bluebird");
require("dotenv").config();

var dbmethods = {};

var host = process.env.DB_URL;

dbmethods.getDB = function() {
  var options = {
    // Initialization Options
    promiseLib: promise
  };

  var pgp = require("pg-promise")(options);
  var connectionString = host + "/crm";
  var db = pgp(connectionString);
  return db;
};

module.exports = dbmethods;
