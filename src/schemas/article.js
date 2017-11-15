var mongoose = require('mongoose');

//用户表结构
module.exports = new mongoose.Schema({

    //标题
    title     : String,

    //作者
    author    : String,

    //内容
    content   : String,

    //评论
    comments   :  String,

    //注册日期
    signInDate   : { type: Date, default: Date.now },

    meta: {
        votes: Number,
        favs:  Number
    }

});