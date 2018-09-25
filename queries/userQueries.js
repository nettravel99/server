var dbmethods = require("../db/db");
var pswdMethods = require("../factories/utils/passwordEncrypt");
// var path = require('path');

db = dbmethods.getDB();

function verifyUser(req, res, next) {
  console.log("verify called", req.body);

  var email = req.body.credentials.email;
  var reqPswd = req.body.credentials.password;

  console.log("email", email);
  console.log("password", reqPswd);

  //  db.one("select * from users where email = $1", email)
  db.one("select * from users where email=$1", email)
    .then(function(data) {
      console.log("Password is: ", pswdMethods.getPassword(reqPswd, data.salt));
      result = pswdMethods.validate(data.salt, data.password, reqPswd);
      // console.log("result", result);
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved User Data"
      });
      /* jshint ignore:end */
    })
    .catch(function(err) {
      console.log("Error in SQL call");
      return next(err);

      // res .status(400) .json({status: "fail", data: err, message: "Error retrieving
      // data"});
    });
}

module.exports = {
  verifyUser: verifyUser
};

// var dbmethods = require("../db/db");
// // var path = require('path');
//
// db = dbmethods.getDB();
//
// function verifyUser(req, res, next) {
//   console.log("verify called", req.params.id);
//   var userID = parseInt(req.params.id);
//   db.one("select * from \"users\" where id = '$1'", userID)
//     .then(function(data) {
//       res.status(200).json({
//         status: "success",
//         data: data,
//         message: "Retrieved User Data"
//       });
//       /* jshint ignore:end */
//     })
//     .catch(function(err) {
//       return next(err);
//     });
// }
//
// module.exports = {
//   verifyUser: verifyUser
// };
