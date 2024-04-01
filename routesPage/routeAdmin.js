const { verifyJwt } = require("../secondaryFunction/auth");
const {checkTokenAdmin} = require("../secondaryFunction/checkTokenAdmin");
const { getAllUsers } = require("../service/users");

const router = require("express").Router();

router.get("/", checkTokenAdmin,  getAllUsers, async (req, res) => {  
  try {
    const { token } = req.cookies;
    const user = verifyJwt(token);
    const users = req.users;
    res.render("admin", { users, user});
  } catch (err) {
    req.error = `routeAdmin  = ${err}`;
    next(err);
  }
});

module.exports = {
  router,
};
