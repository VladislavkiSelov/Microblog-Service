const logger = require("../utils/logger");
const { issueJwt } = require("./auth");

const assignToken = (req, res, next) => {
  const { _role: role } = req;
  try {
    const token = issueJwt({ id: req.user.id, role });
    res.cookie("token", token, { httpOnly: true });
  } catch (err) {
    logger("assignToken").error(err);
  }

  next();
};

module.exports = {
  assignToken,
};
