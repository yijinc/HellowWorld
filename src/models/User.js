/**
 * Created by yjc on 2017-10-31.
 */

var mongoose = require('mongoose');
var userSchema = require('../schemas/user');

module.exports = mongoose.model('User', userSchema);