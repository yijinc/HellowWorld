/**
 * Created by yjc on 2017-10-30.
 */

var express = require('express');
var router = express.Router();

var user = require('./user');

router.get('/user', user.list);


module.exports = router;