const express = require("express");
const router = express.Router();


const {
  createPageController,
  readHisaabController,
  readVerifiedHisaabController,
  createHisaabController ,
  deleteController ,
  editController ,
  editPostController
} = require("../controllers/hisaabController");

const { isLoggedIn} = require("../middlewares/indexauth")

router.get("/create", isLoggedIn , createPageController);
router.post("/create", isLoggedIn , createHisaabController);

router.get("/delete/:id", isLoggedIn , deleteController);

router.get("/edit/:id", isLoggedIn , editController);
router.post("/edit/:id", isLoggedIn , editPostController);



router.get("/view/:id", isLoggedIn , readHisaabController);
router.post("/verify/:id", readVerifiedHisaabController);

module.exports = router; 
