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
    res.json({ state: "success", data: new_member });
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

    // console.log("result:", result);
    const token = memberController.createToken(result);
    // console.log("token::::", token);
    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    // res.send("done");
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/login`);
    res.redirect("/resto");
  }
};
memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.cookie("access_token", null, { maxAge: 0, httpOnly: true });
  res.json({ state: "success", data: "logout successfully!" });
};

memberController.createToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type,
      // mb_phone: result.mb_phone,
      // mb_status: result.mb_status,
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

memberController.checkMyAuthentication = (req, res) => {
  try {
    console.log("GET, cont/checkMyAuthentication");
    let token = req.cookies["access_token"];
    console.log("token", token);
    const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    assert.ok(member, Definer.auth_err2);
    res.json({ state: "success", data: member });
  } catch (err) {
    throw err;
  }
};

memberController.getChosenMember = async (req, res) => {
  try {
    console.log("GET, cont/getChosenMember");
    const id = req.params.id;

    const member = new Member();
    const result = await member.getChosenMemberData(req.member, id);
    // console.log("result:::::", result);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getChosenMember`);
    res.json({ state: "fail", message: err.message });
  }
};
memberController.likeMemberChosen = async (req, res) => {
  try {
    console.log("POST, cont/likeMemberChosen");
    assert.ok(req.member, Definer.auth_err5);

    const like_ref_id = req.body.like_ref_id,
      group_type = req.body.group_type,
      member = new Member(),
      result = await member.likeChosenItemByMember(
        req.member,
        like_ref_id,
        group_type
      );
    // console.log("result:::::", result);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/likeMemberChosen`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.retrieveAuthMember = (req, res, next) => {
  try {
    const token = req.cookies["access_token"];

    req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    next();
  } catch (err) {
    console.log(`ERROR, cont/retrieveAuthMember, ${err.message}`);
    next();
  }
};
