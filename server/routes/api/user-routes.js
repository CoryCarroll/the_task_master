// TODO update saveBook, deleteBook, book route

const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveTask,
  updateTask,
  deleteTask,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
//update saveBook
router.route('/').post(createUser).put(authMiddleware, saveTask);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

//update deleteBook, book route
router.route('/tasks/:taskId').delete(authMiddleware, deleteTask);
// TODO check routes if necessary. "update" may need special attention
router.route('/tasks/:taskId').update(authMiddleware, updateTask);


module.exports = router;
