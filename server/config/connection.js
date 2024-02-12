const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Cory:<password>@taskmaster.tedo0ew.mongodb.net/');

module.exports = mongoose.connection;
