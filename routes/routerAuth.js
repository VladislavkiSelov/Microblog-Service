const express = require("express");
const router = require("express").Router();
const { createUser, findUser} = require("../service/users");
const { checkAdmin} = require("../service/admin");

router.post("/register", express.urlencoded({ extended: true }), createUser, (req,res) => {
  res.redirect("/")
});

router.post("/login", express.urlencoded({ extended: true }), checkAdmin, findUser, (req,res) => {
  res.redirect("/")
});

router.get("/logout", (req,res) => {
  res.clearCookie('token')
  res.redirect("/")
});

module.exports = {
  router,
};
