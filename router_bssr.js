const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");
const uploaderProduct = require("./utils/upload-multer")("products");

/**********************************
 *            BSSR EJS     *
 **********************************/

// Memberga dahldor routers
// router.get("/", memberController.home);
router_bssr
  .get("/signup", restaurantController.getSignupMyRestaurant)
  .post("/signup", restaurantController.signupProcess);

router_bssr
  .get("/login", restaurantController.getLoginMyRestaurant)
  .post("/login", restaurantController.loginProcess);

router_bssr.get("/logout", restaurantController.logout);
router_bssr.get("/check-me", restaurantController.checkSessions);

router_bssr.get("/products/menu", restaurantController.getMyRestaurantData);
router_bssr.post(
  "/products/create",
  uploaderProduct.array("product_images", 5),
  restaurantController.validateAuthRestaurant,
  productController.addNewProduct
);
router_bssr.post("/products/edit/:id", productController.updateChosenProduct);

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
