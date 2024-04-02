const { checkTokenAdmin } = require("../secondaryFunction/checkTokenAdmin");
const { checkTokenExists } = require("../secondaryFunction/checkTokenExists");
const { getAllUsers } = require("../service/users");

const router = require("express").Router();

router.get("/", checkTokenExists, checkTokenAdmin, getAllUsers, async (req, res) => {
  const { user, users } = req;
  res.render("admin", { users, user });
});

module.exports = {
  router,
};
