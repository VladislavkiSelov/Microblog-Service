const { checkTokenUser } = require("../secondaryFunction/checkTokenUser");

const router = require("express").Router();

router.get("/", checkTokenUser, async (req, res) => {
  res.render('addPost', { user: req.user });
});

module.exports = {
  router,
};
