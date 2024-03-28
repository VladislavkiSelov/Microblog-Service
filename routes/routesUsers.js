const express = require("express");
const router = require("express").Router();
const { deleteUser} = require("../service/users");
const { routerError } = require("../service/error");

router.post("/delete", express.urlencoded({ extended: true }), deleteUser, (req,res) => {
  res.redirect("/admin")
});

router.use(routerError)

module.exports = {
  router,
};
