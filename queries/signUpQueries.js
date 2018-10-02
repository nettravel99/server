var dbmethods = require("../db/db");
var pswdMethods = require("../factories/utils/passwordEncrypt");
// var path = require('path');

db = dbmethods.getDB();

function signupUser(req, res, next) {
  //console.log("verify called", req.body);
  const { user } = req.body; // this works because of body-parser middleware.
  var email = user.email;
  var reqPswd = user.password;

  //console.log("email", email);
  //console.log("password", reqPswd);
  // TODO? - email should be transformed to lower case and kept in lower case.
  //  db.one("select * from users where email = $1", email)
  db.one("select * from users where email=$1", email).then(function(data) {
    res.status(400).json({
      errors: {
        global: "This email is already signed up"
      }
    });
  });

  result = pswdMethod.getSaltandHash(reqPswd);
  // Now we need to add the user and get the result back if succesful
  // Then call JWT to send the result back
  user = {
    user: {
      usercode: "MaryC",
      last_name: "Cahill",
      first_name: "Mary",
      password: result.hash,
      salt: result.salt,
      email: email
    }
  };
  //
  db.none(
    "insert into users(usercode, last_name, first_name, password,salt,email)" +
      "values(${usercode}, ${last_name}, ${first_name}, ${password}, ${salt}, ${email})",
    user
  )
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Inserted one users"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  signupUser: signupUser
};
