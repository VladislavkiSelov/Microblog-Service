const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("register", { error: req.error || '' } );
});

module.exports = {
  router,
};
