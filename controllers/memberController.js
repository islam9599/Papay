const Member = require("../models/Member");

let memberController = module.exports;

// memberController.home = (req, res) => {
//   console.log("GET cont.home");
//   res.send("Home sahifadasiz");
// };
memberController.signup = async (req, res) => {
  //   console.log("POST cont.signup");
  //   res.send("Signup sahifadasiz");
  try {
    console.log(`POST, cont/signup`);
    const data = req.body;
    // console.log(`body:::`, req.body);

    const member = new Member();
    const new_member = await member.signupData(data);

    res.send("done");
  } catch (err) {
    console.log(`ERROR, cont/signup`);
  }
};
memberController.login = (req, res) => {
  console.log("POST cont.login");
  res.send("Login sahifadasiz");
};
memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("Logout sahifadasiz");
};
