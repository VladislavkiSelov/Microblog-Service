const {Admin } = require("../connectionMongoose");
const {checkPassword, issueJwt} = require("../secondaryFunction/auth");

async function checkAdmin(req, res, next) {
    const { password, email } = req.body;
    try {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        next()
        return
      }

      const passwordMatch = await checkPassword(password, admin.password);
      if (!passwordMatch) {
        res.status(401).send("Error password");
      }

      const token = issueJwt({ id: admin.id, role:"admin" });
      res.cookie("token", token, { httpOnly: true });
      
      res.redirect("/admin")
    } catch (err) {
      next(err);
    }
  }

  module.exports = {
    checkAdmin
  };
  