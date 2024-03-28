const { verifyJwt } = require("../secondaryFunction/auth");
const {checkAdmin} = require("../secondaryFunction/checkAdmin");
const { getAllUsers } = require("../service/users");

const router = require("express").Router();

router.get("/", checkAdmin,  getAllUsers, async (req, res) => {
  const { token } = req.cookies;
  const user = verifyJwt(token);
  const users = req.users;

  try {
    res.render("admin", { users, user});
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
