const mongoose = require('mongoose');

mongoose.connect(process.env.DATA);

module.exports = mongoose;