/**
 * Created by yjc on 2017-10-30.
 */

var express = require('express');
var router = express.Router();

var user = require('./user');
var label = require('./label');


router.get('/user', user.view);


router.get('/article', user.view);


router.get('/label', label.view);


module.exports = router;