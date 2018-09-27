"use strict";
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */

var pswdFuncs = {};

function genRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password, salt) {
  var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest("hex");
  return { salt: salt, passwordHash: value };
}

// This is for the purpose of testing only
function saltHashPassword(userpassword) {
  var salt = genRandomString(20); /** Gives us salt of length 16 */
  var passwordData = sha512(userpassword, salt);
  console.log("UserPassword = " + userpassword);
  console.log("Passwordhash = " + passwordData.passwordHash);
  console.log("nSalt = " + passwordData.salt);
}

function generateJWT(useremail) {
  return jwt.sign({ email: useremail }, "secretkey");
}

pswdFuncs.getPassword = (userpassword, salt) => {
  var passwordData = sha512(userpassword, salt);
  return { salt: passwordData.salt, passwordHash: passwordData.passwordHash };
};

pswdFuncs.createPassword = (userpassword, length) => {
  var salt = genRandomString(length);
  var passwordData = sha512("TestPassword", salt);
  return {
    length: length,
    salt: passwordData.salt,
    passwordHash: passwordData.passwordHash
  };
};

pswdFuncs.validate = (salt, password, reqPswd, email) => {
  console.log("Salt in validate: ", salt);
  console.log("Password Entered: ", reqPswd);
  try {
    console.log("JWT: ", generateJWT(email));
  } catch {
    console.log("JWT call failed");
  }
  var passwordData = sha512(reqPswd, salt);
  console.log("Password in validate: ", passwordData.passwordHash);
  console.log("Password from database:", password);
  if (passwordData.passwordHash === password) {
    console.log("This was a match");
    return { email: email, token: generateJWT(email) };
  } else {
    console.log("No Match");
    return null;
  }
};

module.exports = pswdFuncs;
