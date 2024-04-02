const { checkTokenExists } = require("../secondaryFunction/checkTokenExists");
const router = require("express").Router();

router.get("/", checkTokenExists, async (req, res) => {
  res.render("addPost");
});

module.exports = {
  router,
};
