var express = require("express");
var router = express.Router();
var db = require("../queries/queries");
var dbPOS = require("../queries/placeOfServiceQueries");

router.get("/api/puppies", db.getAllPuppies);
router.get("/api/puppies/:id", db.getSinglePuppy);
router.post("/api/puppies", db.createPuppy);
router.put("/api/puppies/:id", db.updatePuppy);
router.delete("/api/puppies/:id", db.removePuppy);
router.get("/placeOfService", dbPOS.getAllPlaceOfServices);
router.get("/api/placeOfService", dbPOS.getAllPlaceOfServices);
router.get("/api/puppliesAll", db.getAllPuppies);
router.get("/api/dictionary", db.getAllDictionary);
router.get("/dictionary", db.getAllDictionary);
//router.get('/*', db.catchAll);
/* GET home page. */

// router.get('/placeOfService', function(req,res){
//   res.send('All places of service')
// })

router.get("/dev", function(req, res) {
  res.send("Hello, you are now on the Dev route!");
});

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
