const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // TODO add creator field for multiple users
  // TODO add assignedTo 
  // TODO check taskId
  taskId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deadline: {
    // TODO change to date if we implement calendar
    type: String,
    required: false,
  },
  complete: {
    type: Boolean,
    default: false
  },
});

module.exports = taskSchema;
