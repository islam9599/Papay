const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController.js");

// Memberga dahldor routers
router.get("/", memberController.home);
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);

// Other routers

router.get("/menu", function (req, res) {
  res.send("Menu sahifadasiz");
});

router.get("/community", function (req, res) {
  res.send("Community sahifadasiz");
});

// router.get("/", function (req, res) {
//   res.send("Home sahifadasiz");
// });

module.exports = router;