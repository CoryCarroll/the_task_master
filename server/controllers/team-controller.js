const { Team, User } = require('../models');

module.exports = {
    // get all teams from db
  getTeams(req, res) {
    Team.find()
      .then((teams) => res.json(teams))
      .catch((err) => res.status(500).json(err));
  },
  // gets a single team from the db
  getSingleTeam(req, res) {
    Team.findOne({ _id: req.params.teamId })
      .then((team) =>
        !team
          ? res.status(404).json({ message: 'No team with that ID' })
          : res.json(team)
      )
      .catch((err) => res.status(500).json(err));
  },
//   Handles the creation of a new team
  createTeam(req, res) {
    Team.create(req.body)
      .then((team) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { teams: team._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'team created, but found no user with that ID',
            })
          : res.json('Created the team 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
//   updates the information of an existing team
// TODO may not be set up correctly
  updateTeam(req, res) {
    Team.findOneAndUpdate(
      { _id: req.params.teamId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((team) =>
        !team
          ? res.status(404).json({ message: 'No team with this id!' })
          : res.json(team)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
//   deletes a team
  deleteTeam(req, res) {
    Team.findOneAndRemove({ _id: req.params.teamId })
      .then((team) =>
        !team
          ? res.status(404).json({ message: 'No team with this id!' })
          : User.findOneAndUpdate(
              { teams: req.params.teamId },
              { $pull: { teams: req.params.teamId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'team created but no user with this id!',
            })
          : res.json({ message: 'team successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
