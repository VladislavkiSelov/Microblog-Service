const { issueJwt } = require("./auth");

const assignToken = (req, res, next) => {
    const { _role: role } = req;
  
    const token = issueJwt({ id: req.user.id, role });
    res.cookie('token', token, { httpOnly: true });
  
    next();
  };

  module.exports={
    assignToken
  }