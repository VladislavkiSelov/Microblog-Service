const express = require("express");
const router = require("express").Router();
const { createUser, findUser} = require("../service/users");
const { checkAdmin} = require("../service/admin");
const { validateUserData } = require("../middleware/validationUser");
const { assignToken } = require("../secondaryFunction/assignToken");
const { routerError } = require("../service/error");


router.use(express.urlencoded({ extended: true }))

router.post("/register", validateUserData, createUser, assignToken, (req, res) => {
  res.redirect(`/my-posts/${req.user.id}`);
});

router.post('/login', checkAdmin, (req, res, next) => {
  if (req._role) return next();
  return findUser(req, res, next);
  },
  assignToken,
  (req, res) => {
    if(req._role === 'admin'){
      res.redirect('/admin')
    }else{
      res.redirect('/');
    }
  });

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

router.use(routerError)

module.exports = {
  router,
};
