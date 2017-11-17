/**
 * Created by yjc on 2017-10-30.
 *
 * 异步api
 */

var express = require('express');
var router = express.Router();

var user = require('./user');
var label = require('./label');


router.post('/login', user.login);

router.post('/regist', user.insert);

router.delete('/logout', user.logout);

router.put('/label', label.insert);
router.delete('/label/:id', label.delete);


// 定义 about 页面的路由
router.get('/about', function(req, res) {
    res.send('About birds');
});




module.exports = router;