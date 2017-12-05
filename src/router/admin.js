/**
 * Created by yjc on 2017-10-30.
 */

var express = require('express');
var router = express.Router();

var user = require('./user');
var label = require('./label');

router.get('/user', user.view);

router.get('/label', label.view);


var Article = require('../models/Article');
router.get('/article', function (req, res) {
    if(!req.cookies.user || req.cookies.user.isAdmin===false) {
        res.redirect('/');
        return;
    }

    var page = req.query.page || 1;
    var pageSize = req.query.pageSize || 10 ;

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    Article.count({}, function (err, total) {

        Article.find({}).skip( (page-1)*pageSize ).limit( pageSize ).sort( {'time': -1 }).populate('label').populate('author')
            .exec(function (err, docs) {
                if(err)
                    console.log('查找全部文章失败',err);

                console.log(docs);

                res.render('admin/article.html', {
                    articles: docs,
                    page: page,
                    pageSize: pageSize,
                    totalPage: Math.ceil(total/pageSize),
                    user: req.cookies['user']
                });

            });

    });
});


module.exports = router;