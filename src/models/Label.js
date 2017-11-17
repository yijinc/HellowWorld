var mongoose = require('mongoose');
var labelSchema = require('../schemas/label');

module.exports = mongoose.model('Label', labelSchema);