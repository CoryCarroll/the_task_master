const router = require('express').Router();

const {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../../controllers/task-controller');

// TODO may need to update these routes
router.route('/').get(getTasks).post(createTask);

router
  .route('/:TaskId')
  .get(getSingleTask)
  .put(updateTask)
  .delete(deleteTask);


module.exports = router;
