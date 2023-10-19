const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");

/**********************************
 *            BSSR EJS     *
 **********************************/

// Memberga dahldor routers
// router.get("/", memberController.home);
router_bssr.get("/signup", restaurantController.getSignupMyRestaurant);
router_bssr.post("/signup", restaurantController.signupProcess);

router_bssr.get("/login", restaurantController.getLoginMyRestaurant);
router_bssr.post("/login", restaurantController.loginProcess);

router_bssr.get("/logout", restaurantController.logout);

// Other routers

router_bssr.get("/menu", function (req, res) {
  res.send("Menu sahifadasiz");
});

router_bssr.get("/community", function (req, res) {
  res.send("Community sahifadasiz");
});

// router.get("/", function (req, res) {
//   res.send("Home sahifadasiz");
// });

module.exports = router_bssr;
