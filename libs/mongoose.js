const mongoose = require('mongoose');

 mongoose.connect(process.env.DATA, { useMongoClient: true});

module.exports = mongoose;