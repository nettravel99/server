var dbmethods = require('../db/db');


 //db = dbmethods.getDB();

function getAllPlaceOfServices(req, res, next) {
  console.log("This is db ****", db.any)
    db
        .any('select * from pos')
        .then(function (data) {
            res
                .status(200)
                .json({status: 'success', data: data, message: 'Retrieved ALL Places of Service'});
        })
        .catch(function (err) {
            return next(err);
        });
}



// add query functions

module.exports = {
    getAllPlaceOfServices : getAllPlaceOfServices
};
