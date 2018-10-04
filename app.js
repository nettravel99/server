var express = require("express");
const helmet = require("helmet");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var bodyparser = require("body-parser");
var index = require("./routes/index");
var users = require("./routes/users");
var auth = require("./routes/auth");
var signup = require("./routes/signup");

var pswdFuncs = require("./factories/utils/passwordEncrypt");

// Testing the password functions
// var salt=pswdFuncs.genRandomString(20);
// var passwordData = pswdFuncs.sha512("TestPassword",salt)
var passwordData = pswdFuncs.getPassword("MYPASSWORD", "this is salt 14");

console.log("Passwordhash = " + passwordData.passwordHash);
console.log("nSalt = " + passwordData.salt);

passwordData = pswdFuncs.createPassword("MYPASSWORD", 23);
console.log("Length = " + passwordData.length);
console.log("Passwordhash = " + passwordData.passwordHash);
console.log("nSalt = " + passwordData.salt);
// End Testing

var app = express();
// Using Helmet for security settings of the header
// ???? Todo  ???? need to set headers for security.

app.use(helmet());
app.use(bodyparser.json());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", index);
app.use("/users", users);

app.use("/api/auth", auth);
app.use("/api/signup", signup);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// development error handler will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.code || 500).json({ status: "error", message: err });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({ status: "error", message: err.message });
});

// https.createServer(httpsOptions, app);

module.exports = app;
