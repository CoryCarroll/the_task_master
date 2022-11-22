const router = require('express').Router();
const {
  getSingleUser,
  createUser,
  saveTask,
  deleteTask,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveTask);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/tasks/:taskId').delete(authMiddleware, deleteTask);
// TODO check routes if necessary


module.exports = router;
