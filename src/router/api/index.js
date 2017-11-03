/**
 * Created by yjc on 2017-10-30.
 */

var express = require('express');
var router = express.Router();

var user = require('./user');

// 定义网站主页的路由
router.get('/users', user.list);
router.get('/user/:id', user.view);
router.post('/user/:id', user.update);


router.post('/login', function (req, res) {
    res.send('About birds');
});

router.post('/regist', user.insert);

router.post('/logout', function (req, res) {
    res.send('About birds');
});

// 定义 about 页面的路由
router.get('/about', function(req, res) {
    res.send('About birds');
});




module.exports = router;