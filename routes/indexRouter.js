const express = require("express");
const router = express.Router();

const {
  homepageController,
  logoutController,
  profileController,
  registerPageController,
  registerController,
  loginController
} = require("../controllers/indexController");

const { isLoggedIn } = require("../middlewares/indexauth");

router.get("/", homepageController);

router.get("/logout", logoutController);
router.post("/login", loginController);
router.get("/register", registerPageController);
router.post("/register", registerController);

router.get("/profile", isLoggedIn , profileController );

module.exports = router;
