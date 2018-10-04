var dbmethods = require("../db/db");
var pswdMethods = require("../factories/utils/passwordEncrypt");
var jwt = require("jsonwebtoken");
// var path = require('path');

// const test = async () => {
//   await console.log("HI");
// };

db = dbmethods.getDB();

async function signupUser(req, res, next) {
  console.log("signup req: ", req);
  const { user } = req.body; // this works because of body-parser middleware.
  var email = user.email;
  var reqPswd = user.password;
  // await test();
  //
  //console.log("email", email);
  //console.log("password", reqPswd);
  // TODO? - email should be transformed to lower case and kept in lower case.
  //  db.one("select * from users where email = $1", email)
  let edata;
  try {
    edata = await db.any("select * from users where email=$1 ", email);
  } catch (err) {
    console.log(new Error(err.message));
  }

  if (edata.length) {
    res.status(403).json({
      errors: {
        global: "This email is in use"
      }
    });
    return;
  }
  /*
  await console.log("edata:=>", edata);
  await db
    .one("select * from users where email=$1", email)
    .then(function(data) {
      console.log("Email already exists: ", useremail);
      res.status(400).json({
        errors: {
          global: "This email is already signed up"
        }
      });
    });

    */
  console.log("after select");
  result = pswdMethods.getSaltandHash(reqPswd);
  // Now we need to add the user and get the result back if succesful
  // Then call JWT to send the result back
  userSignup = {
    usercode: "MaryC",
    last_name: "Cahill",
    first_name: "Mary",
    password: result.hashSalt.passwordHash,
    salt: result.hashSalt.salt,
    email: email
  };
  //
  console.log("before Inserted");
  let token = jwt.sign({ email: email }, "secretkey");
  db.none(
    "insert into users(usercode, last_name, first_name, password,salt,email)" +
      "values(${usercode}, ${last_name}, ${first_name}, ${password}, ${salt}, ${email})",
    userSignup
  )
    .then(function() {
      res.status(200).json({
        status: "success",
        data: { email: email, token: jwt.sign({ email: email }, "secretkey") },
        message: "Sign Up was successful"
      });
    })
    .catch(function(err) {
      console.log("Insert Error");
      return next(err);
    });
}

module.exports = {
  signupUser: signupUser
};
