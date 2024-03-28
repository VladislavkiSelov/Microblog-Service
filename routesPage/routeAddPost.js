const { verifyJwt } = require("../secondaryFunction/auth");
const { checkUser } = require("../secondaryFunction/checkUser");

const router = require("express").Router();

router.get("/", checkUser, async (req, res) => {
  try {
    const { token } = req.cookies;
    const user = verifyJwt(token);
    
    res.render("addPost", {user});
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
