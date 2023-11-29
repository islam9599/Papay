const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController.js");
const productController = require("./controllers/productController.js");

/**********************************
 *             REST API           *
 **********************************/

// Member related routers
// router.get("/", memberController.home);
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
  "/member/:id",
  memberController.retrieveAuthMember,
  memberController.getChosenMember
);

// Product related routers

router.post(
  "/products",
  memberController.retrieveAuthMember,
  productController.getAllProducts
);

module.exports = router;
