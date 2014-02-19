
/*
 * GET home page.
 */

exports.login = require('./login');
exports.create_new_user = require('./create_new_user');
exports.upload = require('./upload');
exports.list_users = require('./list_users');

exports.index = function(req,res){
    res.send('This is the / route');
};