const Member = require("../models/Member");
const Product = require("../models/Product");

let restaurantController = module.exports;

restaurantController.home = async (req, res) => {
  try {
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR, cont/home-page, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET, cont/getMYRestaurantProducts");
    // res.render("signup");
    // TODO: Get my restaurant products

    const product = new Product();
    const data = product.getAllProductsDataResto(res.locals.member);
    // const data = await res.render("restaurant-menu");
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log(`ERROR, cont/getMyRestaurantProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

// memberController.home = (req, res) => {
//   console.log("GET cont.home");
//   res.send("Home sahifadasiz");
// };
restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET, cont/signup");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR, cont/getSignUpMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  //   console.log("POST cont.signup");
  //   res.send("Signup sahifadasiz");
  try {
    console.log("POST, cont/signup");
    const data = req.body;
    // console.log(`body:::`, req.body);
    const member = new Member();
    const new_member = await member.signupData(data);

    req.session.member = new_member;

    res.redirect("/resto/products/menu");

    // res.send("done");
    // res.json({ state: "success", data: new_member });
    // Session auth
  } catch (err) {
    console.log(`ERROR, cont/signup`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("GET, cont/getLoginMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  //   console.log("POST cont.login");
  //   res.send("Login sahifadasiz");
  try {
    console.log("POST, cont/login");
    const data = req.body;
    // console.log(`body:::`, req.body);
    const member = new Member();
    const result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/resto/products/menu");
    });

    // res.send("done");
    // res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/login`);
    res.json({ state: "fail", message: err.message });
  }
};
restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("Logout sahifadasiz");
};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "only authenticated members with restaurant type",
    });
};

restaurantController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "succeed", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated user" });
  }
};
