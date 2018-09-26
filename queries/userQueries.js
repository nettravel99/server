var dbmethods = require("../db/db");
var pswdMethods = require("../factories/utils/passwordEncrypt");
// var path = require('path');

db = dbmethods.getDB();

function verifyUser(req, res, next) {
  console.log("verify called", req.body);
  const { credentials } = req.body; // this works because of body-parser middleware.
  var email = credentials.email;
  var reqPswd = credentials.password;

  console.log("email", email);
  console.log("password", reqPswd);
  // TODO? - email should be transformed to lower case and kept in lower case.
  //  db.one("select * from users where email = $1", email)
  db.one("select * from users where email=$1", email)
    .then(function(data) {
      console.log("Password is: ", pswdMethods.getPassword(reqPswd, data.salt));
      // data.salt and data.password are the values in the datatbase. reqPswd is from the user logging in.
      result = pswdMethods.validate(
        data.salt,
        data.password,
        reqPswd,
        data.email
      );
      console.log("result", result);
      //var result = true;
      if (result) {
        res.status(200).json({
          status: "success",
          data: result,
          message: "Retrieved User Data"
        });
        /* jshint ignore:end */
      } else {
        res.status(400).json({
          errors: {
            global: "Invalid Credentials - 3"
          }
        });
      }
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
