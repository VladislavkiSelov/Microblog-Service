const express = require("express");
const router = require("express").Router();
const { deleteUser} = require("../service/users");

router.post("/delete", express.urlencoded({ extended: true }), deleteUser, (req,res) => {
  res.redirect("/admin")
});

module.exports = {
  router,
};
