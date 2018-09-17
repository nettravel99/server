var express = require('express');
var router = express.Router();

/* POST for auth listing. */
router.post('/', function (req, res, next) {
  // Comment out this line: res.send('respond with a resource'); And insert
  // something like this instead:
  console.log("Auth called");
  res.status(400).json({ errors: { global: 'Invalid Credentials'}});

});


/* POST for auth listing. */
router.get('/', function (req, res, next) {
    // Comment out this line: res.send('respond with a resource'); And insert
    // something like this instead:
    console.log("Auth called");
    res.status(400).json({ errors: { global: 'Invalid Credentials'}});
  
  });
  

module.exports = router;