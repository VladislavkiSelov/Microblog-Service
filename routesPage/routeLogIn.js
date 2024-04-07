const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("login", { error: req.error || '' });
});

module.exports = {
  router,
};
