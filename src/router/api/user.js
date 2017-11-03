/**
 * Created by yjc on 2017-10-30.
 */

var User = require('../../models/User');


exports.list = function(req, res){
    res.render('users', { title: 'Users', users: users });
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
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        signInDate: Date.now()
    });
    user.save().then(function (err) {
        console.log(err);
        if(err) {
            console.log("插入新用户数据失败");
        } else {
            res.send({
                code: 0,
                user: user
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