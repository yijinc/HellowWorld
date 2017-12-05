/**
 * Created by yjc on 2017-10-30.
 *
 * 异步api
 */

var express = require('express');
var router = express.Router();

var user = require('./user');
var label = require('./label');
var Article = require('../models/Article');


router.post('/login', user.login);

router.post('/regist', user.insert);

router.delete('/logout', user.logout);

router.put('/label', label.insert);
router.delete('/label/:id', label.delete);

router.get('/article', function (req, res) {

    var page = req.query.page || 1;
    var pageSize = req.query.pageSize || 5 ;
    var searchText = req.query.searchText;

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    Article.count({ title : new RegExp(searchText) }, function (err, total) {

        Article.find( {title : new RegExp(searchText) }).skip( (page-1)*pageSize ).limit( pageSize ).sort( {'time': -1 }).populate('label').populate('author')
            .exec(function (err, docs) {
                if(err)
                    console.log('查找全部文章失败',err);

                console.log(docs);
                res.send({
                    success: true,
                    articles: docs,
                    totalCount: total
                });

            });

    });
});


// 定义 about 页面的路由
router.get('/about', function(req, res) {
    res.send('About birds');
});




module.exports = router;