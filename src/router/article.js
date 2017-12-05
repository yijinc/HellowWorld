var express = require('express');
var router = express.Router();

var Article = require('../models/Article');
var Label = require('../models/Label');



var articleUtil = {

    add: function (req, res) {

        if(!req.body.title) {
            res.send({
                success: false,
                error: '标题不能为空'
            });
            return;
        }
        if(!req.body.content) {
            res.send({
                success: false,
                error: '征文不能为空'
            });
            return;
        }
        /*
        * req.body.label 值为 '"xxx"' 需要去除前后引号
        * */
        new Article({
            title: req.body.title,
            label: req.body.label.replace(/\"/g,""),
            content: req.body.content,
            time: Date.now(),
            author: req.cookies.user.id
        }).save(function (err, article) {

            if(err)
                console.error(err);

            res.redirect('/');

        });
    },

    view: function (req, res) {

    },

    addView: function (req, res) {

        Label.find({}, function (err, docs) {

            if(err)
                console.log('label find err in add article', err);

            res.render('article_add.html', {
                user: req.cookies['user'],
                labels: docs
            });
        });
    }
};

router.get('', articleUtil.addView);

router.post('/add', articleUtil.add);

router.get('/:id', articleUtil.view);

module.exports = router;