var express = require("express");
var router = express.Router();
var signupQueries = require("../queries/signupQueries");

router.post("/signup", signupQueries.signupUser);

/* GET users listing. */
router.get("/", function(req, res, next) {
  // Comment out this line: res.send('respond with a resource'); And insert
  // something like this instead:
  res.json([
    {
      id: 1,
      username: "samsepi0l"
    },
    {
      id: 2,
      username: "D0loresH4ze"
    }
  ]);
});

router.get("/dev", function(req, res) {
  res.send("Hello, you are now on the Dev route!");
});

module.exports = router;
