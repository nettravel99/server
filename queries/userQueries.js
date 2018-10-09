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
      console.log("Data in login:", data);
      // data.salt and data.password are the values in the datatbase. reqPswd is from the user logging in.
      result = pswdMethods.validate(
        data.salt,
        data.password,
        reqPswd,
        data.email
      );
      console.log("result:", result);
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
            global: "Invalid Credentials - during login"
          }
        });
      }
    })
    .catch(function(err) {
      res.status(400).json({
        errors: {
          global: "SQL error " + String(err.message)
        }
      });

      // res .status(400) .json({status: "fail", data: err, message: "Error retrieving
      // data"});
    });
}

async function confirm(req, res, next) {
  const { token } = req.body; // this works because of body-parser middleware.
  console.log("confirmed called ", token);
  //console.log("email", email);
  //console.log("password", reqPswd);
  // TODO? - email should be transformed to lower case and kept in lower case.
  //  db.one("select * from users where email = $1", email)
  let edata;
  try {
    edata = await db.any("SELECT user_token_exists2('30')");
  } catch (err) {
    console.log("Error Message", err.message);
    res.status(403).json({
      errors: {
        global: err.message
      }
    });
    return;
  }
  console.log("Stage 1", edata);

  if (!edata.length) {
    res.status(403).json({
      errors: {
        confirmed: false,
        global: "You are not registered - please register"
      }
    });
    return;
  }
  const { email } = edata;

  return res.status(200).json({
    status: "success",
    data: {
      confirmed: true,
      token: jwt.sign({ email: email }, "secretkey")
    },
    message: "Sign up was successful"
  });
}

module.exports = {
  verifyUser: verifyUser,
  confirm: confirm
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
