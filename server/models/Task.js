const mongoose = require('mongoose');

const { Schema } = mongoose;

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // TODO add creator field for multiple users
  // TODO add assignedTo 
  // TODO check taskId
  description: {
    type: String
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
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }

});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
