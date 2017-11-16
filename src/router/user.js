/**
 * Created by yjc on 2017-10-30.
 */

var User = require('../models/User');


exports.list = function(req, res){

    var page = req.query.page || 1;
    var pageSize = req.query.pageSize || 5 ;

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    User.count({}, function (err, total) {

        // +pageSize 转换为number

        User.find({}).skip( (page-1)*pageSize ).limit( pageSize ).sort( {'signInDate': -1 })
            .exec(function (err, docs) {
                if(err)
                    console.log('查找全部用户失败',err);

                res.render('admin/user.html', {
                    users: docs,
                    page: page,
                    pageSize: pageSize,
                    totalPage: Math.ceil(total/pageSize)
                });

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
    User.findOne({username: req.body.username, password: req.body.password }, function (err, user) {

        if(err)
            console.log('查找用户名失败 login',err);

        console.log(user);

        if(!user) {

            res.send({
                success: false,
                error: '用户名或密码错误'
            })

        } else {

            res.cookie('user', {
                "username": user.username,
                "isLogin": true,
                "isAdmin": user.isAdmin
            }, { expires: new Date(Date.now() + 900000) } );

            res.send({
                success: true,
                data: '登录成功'
            })

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