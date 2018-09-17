var express = require('express');
var router = express.Router();

var db = require('../queries/queries');

router.get('/api/puppies', db.getAllPuppies);

module.exports = router;