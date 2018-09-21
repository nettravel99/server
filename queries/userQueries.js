var dbmethods = require("../db/db");
// var path = require('path');

db = dbmethods.getDB();

function verifyUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.one("select user,salt,password from pups where id = $1", userID)
    .then(function(result) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved User Data"
      });
      /* jshint ignore:end */
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  verifyUser: verifyUser
};
