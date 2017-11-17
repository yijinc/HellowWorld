/**
 * Created by yjc on 2017-10-30.
 */

var Label = require('../models/Label');


exports.list = function(req, res){

    if(!req.cookies.user || req.cookies.user.isAdmin===false) {
        res.redirect('/');
        return;
    }

    Label.find({}, function (err, docs) {
        if(err)
            console.log('label find err', err);
        res.send({
            success: true,
            data: docs
        })
    });

};

exports.insert = function(req, res){

    console.log(req.body.labelName);

    if(!req.body.labelName) {
        res.send({
            success: false,
            error: '标签名不能为空'
        })
    }

    Label.find({name: req.body.labelName }, function (err, docs) {

        if(err)
            console.log(err);

        if(docs && docs.length>0) {
            res.send({
                success: false,
                error: '标签名存在'
            })

        } else {
            //可插入
            var label = new Label({
                name: req.body.labelName
            });
            label.save(function (err, label) {

                if(err)
                    console.error(err);

                res.send({
                    success: true,
                    data: label
                })

            });
        }
    });
};

exports.delete = function(req, res){

    console.log(req.params.id);

    Label.remove({_id: req.params.id}, function (err) {

        if(err) {
            res.send({
                success: false,
                error: '删除标签失败'
            })
        } else {
            res.send({
                success: true,
                error: '删除标签成功'
            })
        }
    })

};


exports.view = function(req, res){
    if(!req.cookies.user || req.cookies.user.isAdmin===false) {
        res.redirect('/');
        return;
    }

    Label.find({}, function (err, docs) {
       if(err)
           console.log('label find err', err);
        res.render('admin/label.html', {
            user: req.cookies.user,
            labels: docs
        })
    });
};
