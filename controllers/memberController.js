const assert = require("assert");
const Member = require("../models/Member");

let memberController = module.exports;
const jwt = require("jsonwebtoken");
const Definer = require("../lib/mistake");

// memberController.home = (req, res) => {
//   console.log("GET cont.home");
//   res.send("Home sahifadasiz");
// };
memberController.signup = async (req, res) => {
  //   console.log("POST cont.signup");
  //   res.send("Signup sahifadasiz");
  try {
    console.log("POST, cont/signup");
    const data = req.body;
    // console.log(`body:::`, req.body);
    const member = new Member();
    const new_member = await member.signupData(data);
    const token = memberController.createToken(new_member);
    console.log("token::::", token);
    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    // res.send("done");
    res.json({ state: "succeed", data: new_member });
  } catch (err) {
    console.log(`ERROR, cont/signup`);
    res.json({ state: "fail", message: err.message });
  }
};
memberController.login = async (req, res) => {
  //   console.log("POST cont.login");
  //   res.send("Login sahifadasiz");
  try {
    console.log("POST, cont/login");
    const data = req.body;
    // console.log(`body:::`, req.body);
    const member = new Member();
    const result = await member.loginData(data);

    console.log("result:", result);
    const token = memberController.createToken(result);
    console.log("token::::", token);
    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    // res.send("done");
    res.json({ state: "succeed", data: result });
  } catch (err) {
    console.log(`ERROR, cont/login`);
    res.redirect("/resto");
  }
};
memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("Logout sahifadasiz");
};

memberController.createToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type,
    };

    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });

    assert.ok(token, Definer.auth_err2);
    return token;
  } catch (err) {
    throw err;
  }
};
