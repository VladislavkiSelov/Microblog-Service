const router = require("express").Router();

// не впевнений, нащо тобі токен і авторізація на сторінці Register
// по хорошому, цю сторінку не має бачити зареєстрований юзер взагалі
router.get("/", async (req, res) => {
  res.render("register");
});

module.exports = {
  router,
};
