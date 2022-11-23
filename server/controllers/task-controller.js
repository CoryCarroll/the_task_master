const { Task, User } = require('../models');

module.exports = {
    // get all task from db
  getTasks(req, res) {
    Task.find({where:{_id:req.body.userId}})
      .then((task) => res.json(task))
      .catch((err) => res.status(500).json(err));
  },
  // gets a single task from the db
  getSingleTask(req, res) {
    Task.findOne({ _id: req.params.taskId })
      .then((task) =>
        !task
          ? res.status(404).json({ message: 'No task with that ID' })
          : res.json(task)
      )
      .catch((err) => res.status(500).json(err));
  },
//   Handles the creation of a new task
  createTask(req, res) {
    Task.create(req.body)
      .then((task) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { tasks: task._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'task created, but found no user with that ID',
            })
          : res.json('Created the task 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
//   updates the information of an existing task
// TODO may not be set up correctly
  updateTask(req, res) {
    Task.findOneAndUpdate(
      { _id: req.params.taskId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((task) =>
        !task
          ? res.status(404).json({ message: 'No task with this id!' })
          : res.json(task)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
//   deletes a task
  deleteTask(req, res) {
    Task.findOneAndRemove({ _id: req.params.taskId })
      .then((task) =>
        !task
          ? res.status(404).json({ message: 'No task with this id!' })
          : User.findOneAndUpdate(
              { task: req.params.taskId },
              { $pull: { task: req.params.taskId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'task created but no user with this id!',
            })
          : res.json({ message: 'task successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
