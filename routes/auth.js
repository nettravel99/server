var express = require("express");
var router = express.Router();
var db = require("../queries/userQueries");
var db1 = require("../queries/queries");
/* POST for auth listing. */

router.post("/", db.verifyUser);

router.post("/", function(req, res, next) {
  // Comment out this line: res.send('respond with a resource'); And insert
  // something like this instead:
  console.log("Auth called");
  res.status(400).json({
    errors: {
      global: "Invalid Credentials - 1"
    }
  });
});

router.get("/:id", db.verifyUser);

/* POST for auth listing. */
router.get("/", function(req, res, next) {
  // Comment out this line: res.send('respond with a resource'); And insert
  // something like this instead:
  console.log("Auth called");
  res.status(400).json({
    errors: {
      global: "Invalid Credentials - 2"
    }
  });
});

module.exports = router;

// var express = require("express");
// var router = express.Router();
// var db = require("../queries/userQueries");
// var db1 = require("../queries/queries");
// /* POST for auth listing. */
// router.post("/", function(req, res, next) {
//   // Comment out this line: res.send('respond with a resource'); And insert
//   // something like this instead:
//   console.log("Auth called");
//   res.status(400).json({ errors: { global: "Invalid Credentials - 1" } });
// });
//
// router.get("/:id", db.verifyUser);
//
// /* POST for auth listing. */
// router.get("/", function(req, res, next) {
//   // Comment out this line: res.send('respond with a resource'); And insert
//   // something like this instead:
//   console.log("Auth called");
//   res.status(400).json({ errors: { global: "Invalid Credentials - 2" } });
// });
//
// module.exports = router;
