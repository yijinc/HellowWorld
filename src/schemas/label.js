

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    name     : String,
    isSystem : { type: Boolean, default: false }

});