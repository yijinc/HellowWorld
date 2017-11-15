/**
 * Created by yjc on 2017-10-31.
 */

var mongoose = require('mongoose');

//用户表结构
module.exports = new mongoose.Schema({

    //用户名
    username     : String,

    //密码
    password     : String,

    //注册日期
    signInDate   : { type: Date, default: Date.now },

    //是否是管理员
    isAdmin      : { type: Boolean, default: false }

});