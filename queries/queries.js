var dbmethods = require("../db/db");
// var path = require('path');

db = dbmethods.getDB();

console.log("Look here", dbmethods);

// function catchAll(req, res, next) {
//      res.sendFile(path.join(__dirname,'index.html'));
// }

function getModel(req, res, next) {
  db.any("select * from pups")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL puppies"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getAllDictionary(req, res, next) {
  db.any("select * from model where fieldName='mainD'")
    .then(function(data) {
      console.log("Query results: ", data);
      res.status(200).json({ results: data });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getAllPuppies(req, res, next) {
  db.any("select * from dictionary")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL puppies"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one("select * from pups where id = $1", pupID)
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE puppy"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function createPuppy(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none(
    "insert into pups(name, breed, age, sex)values(${name}, ${breed}, ${age}, ${sex})",
    req.body
  )
    .then(function() {
      res
        .status(200)
        .json({ status: "success", message: "Inserted one puppy" });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updatePuppy(req, res, next) {
  db.none("update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5", [
    req.body.name,
    req.body.breed,
    parseInt(req.body.age),
    req.body.sex,
    parseInt(req.params.id)
  ])
    .then(function() {
      res.status(200).json({ status: "success", message: "Updated puppy" });
    })
    .catch(function(err) {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result("delete from pups where id = $1", pupID)
    .then(function(result) {
      /* jshint ignore:start */
      res.status(200).json({
        status: "success",
        message: `Removed ${result.rowCount} puppy`
      });
      /* jshint ignore:end */
    })
    .catch(function(err) {
      return next(err);
    });
}

// add query functions

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy,
  getAllDictionary: getAllDictionary
};
