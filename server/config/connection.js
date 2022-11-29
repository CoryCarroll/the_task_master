const mongoose = require('mongoose');

// made the right connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/task_master', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
