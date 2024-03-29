const { checkUser } = require('../secondaryFunction/checkUser');

const router = require('express').Router();

router.get('/', checkUser, async (req, res) => {
  res.render('addPost', { user: req.user });
});

module.exports = {
  router,
};
