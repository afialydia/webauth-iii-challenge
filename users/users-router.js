const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function checkRole() {
  return function(req, res, next) {
    if (req.token) {
      next();
    } else {
      res
        .status(403)
        .json({ message: `You have no power here, you must be an ${role}` });
    }
  };
}

module.exports = router;
