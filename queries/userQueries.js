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

  //console.log("email", email);
  //console.log("password", reqPswd);
  // TODO? - email should be transformed to lower case and kept in lower case.
  //  db.one("select * from users where email = $1", email)
  let edata;
  try {
    edata = await db.any(
      "select * from users where confirmationToken=$1 ",
      token
    );
  } catch (err) {
    res.status(403).json({
      errors: {
        global: err.message
      }
    });
    return;
  }

  if (!edata.length) {
    res.status(403).json({
      errors: {
        global: "This email is in use"
      }
    });
    return;
  }

  console.log("before Inserted");
  let token = jwt.sign({ email: email }, "secretkey");
  db.none(
    "insert into users(usercode, last_name, first_name, password,salt,email,confirmationToken)" +
      "values(${usercode}, ${last_name}, ${first_name}, ${password}, ${salt}, ${email}, ${confirmationToken})",
    userSignup
  )
    .then(function() {
      sendConfirmationEmail(userSignup),
        res.status(200).json({
          status: "success",
          data: {
            email: email,
            token: jwt.sign({ email: email }, "secretkey")
          },
          message: "Sign Up was successful"
        });
    })
    .catch(function(err) {
      console.log("Error in SQL call");
      res.status(400).json({
        errors: {
          global: "SQL error " + String(err.message)
        }
      });

      // res .status(400) .json({status: "fail", data: err, message: "Error retrieving
      // data"});
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
