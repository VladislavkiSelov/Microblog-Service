const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("login",{error});
});

module.exports = {
  router,
};
