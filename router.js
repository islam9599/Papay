const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Home sahifadasiz");
});

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
