const express = require('express');
const router = require('express').Router();

const { createUser, findUser } = require('../service/users');
const { checkAdmin } = require('../service/admin');
const { routerError } = require('../service/error');
const { validateUserData } = require('../middleware/validationUser');
const { issueJwt } = require('../secondaryFunction/auth');

//! просто додай на обидва роути одночасно :)
router.use(express.urlencoded({ extended: true }));

const assignToken = (req, res, next) => {
  const { _role: role } = req;

  const token = issueJwt({ id: req.user.id, role });
  res.cookie('token', token, { httpOnly: true });

  next();
};

router.post('/register', validateUserData, createUser, assignToken,
  (req, res) => {
    res.redirect(`/my-posts/${req.user.id}`);
  },
  (error, req, res, next) => {
    // чому б не показувати помилку хоча б так?
    res.render('register', { error });
  }
);

router.post('/login', checkAdmin, (req, res, next) => {
  if (req._role) return next();
  return findUser(req, res, next);
  },
  assignToken,
  (req, res) => {
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

router.use(routerError);

module.exports = {
  router,
};
