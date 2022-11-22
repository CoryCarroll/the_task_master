const router = require('express').Router();

const {
  getTeams,
  getSingleTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} = require('../../controllers/team-controller');

// TODO may need to update these routes
router.route('/').get(getTeams).post(createTeam);

router
  .route('/:teamId')
  .get(getSingleTeam)
  .put(updateTeam)
  .delete(deleteTeam);


module.exports = router;
