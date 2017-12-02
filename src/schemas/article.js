var mongoose = require('mongoose');

//用户表结构
module.exports = new mongoose.Schema({

    //标题
    title     : String,

    //作者
    author    : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    //标签
    label    : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label'
    },

    //内容
    content   : String,

    //发布时间
    time      : { type: Date,  default: Date.now }

});