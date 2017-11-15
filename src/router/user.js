/**
 * Created by yjc on 2017-10-30.
 */

var User = require('../models/User');


exports.list = function(req, res){

    User.find({}, function (err, docs) {
        if(err)
            console.log('查找全部用户失败',err);

        res.render('admin/user.html', {
            users: docs
        });


    });

};


exports.view = function(req, res){
    res.render('users/view', {
        title: 'Viewing user ' + req.user.name,
        user: req.user
    });
};

exports.insert = function (req, res) {
    console.log(req.body.username, req.body.password);
    // res.setHeader('Content-Type', 'text/json')

    //检测用户名是否存在
    User.find({username: req.body.username }, function (err, docs) {

        if(err)
            console.log('查找用户名失败',err);

        if(docs && docs.length>0) {
            res.send({
                success: false,
                error: '用户名存在'
            })

        } else {
            //可插入
            var user = new User({
                username: req.body.username,
                password: req.body.password,
                signInDate: Date.now()
            });
            user.save(function (err, user) {

                if(err)
                    console.error(err);

                res.send({
                    success: true,
                    data: user
                })

            });
        }
    });
};


exports.login = function (req, res) {
    console.log(req.body.username, req.body.password);

    //检测用户名是否存在
    User.findOne({username: req.body.username, password: req.body.password }, function (err, doc) {

        if(err)
            console.log('查找用户名失败 login',err);

        console.log(doc);

        if(!doc) {

            res.send({
                success: false,
                error: '用户名或密码错误'
            })

        } else {

            req.cookie.set('user', doc, { expires: new Date(Date.now() + 900000) } );

            if(user.isAdmin) {
                res.redirect('/admin/user')
            }

        }
    });
};

exports.update = function(req, res){
    // Normally you would handle all kinds of
    // validation and save back to the db
    var user = req.body.user;
    req.user.name = user.name;
    req.user.email = user.email;
    res.redirect('back');
};