var db = require('../models');

module.exports.getTeachers = function(callback){
  db.options.findOne({}, function(err, found){
    if (err) console.log(err);
    callback(err, found.teachers);
  });
};

module.exports.getArrayOfClasses = function(callback){
  db.options.findOne({}, function(err, found){
    if (err) console.log(err);
    var arr_classes = new Array();
    for (var x = 1; x <= found.numClassPeriods; x++)
      arr_classes.push(x);
    callback(err, arr_classes);
  });
};

module.exports.getClasses = function(callback){
  db.options.findOne({}, function(err, found){
    if (err) console.log(err);
    callback(err, found.classes);
  });
};

module.exports.getAllOptions = function(callback){
  db.options.findOne({}, function(err, found){
    if (err) console.log(err);
    var arr_classes = [];
    console.log(parseInt(found.numClassPeriods, 10));
    for (var x = 1; x <= parseInt(found.numClassPeriods, 10); x++)
      arr_classes.push(x);
    console.log(arr_classes);
    found['arrClassPeriods'] = arr_classes;
    callback(err, found);
  });
};
