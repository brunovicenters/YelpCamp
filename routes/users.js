const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users");

router.get("/register", users.renderRegister);

router.post("/register", catchAsync(users.newUser));

router.get("/login", users.renderLogin);

router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.login
);

router.get("/logout", users.logout);

module.exports = router;
