const Member = require("../models/Member");

let restaurantController = module.exports;

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

    // res.send("done");
    res.json({ state: "success", data: new_member });
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
    console.log(`POST, cont/signup, ${err.message}`);
    const data = req.body;
    // console.log(`body:::`, req.body);
    const member = new Member();
    const result = await member.loginData(data);

    // res.send("done");
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("Logout sahifadasiz");
};
