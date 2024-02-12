const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Cory:Hani1072@taskmaster.tedo0ew.mongodb.net/');

module.exports = mongoose.connection;
