/**
 * Created by yjc on 2017-12-1.
 */

var mongoose = require('mongoose');
var articleSchema = require('../schemas/article');

module.exports = mongoose.model('Article', articleSchema);