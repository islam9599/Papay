const assert = require("assert");
const Definer = require("../lib/mistake");
const Follow = require("../models/Follow");
let followController = module.exports;

followController.subscribe = async (req, res) => {
  try {
    console.log("POST, cont/subscribe");
    assert.ok(req.member, Definer.auth_err5);

    const follow = new Follow();
    await follow.subscribeData(req.member, req.body);

    res.json({ state: "success", data: "subscribed" });
  } catch (err) {
    console.log(`ERROR, cont/subscribe`);
    res.json({ state: "fail", message: err.message });
  }
};
followController.unsubscribe = async (req, res) => {
  try {
    console.log("POST, cont/unsubscribe");
    assert.ok(req.member, Definer.auth_err5);

    const follow = new Follow();
    const result = await follow.unsubscribeData(req.member, req.body);
    assert.ok(result, Definer.general_err1);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/unsubcribed`);
    res.json({ state: "fail", message: err.message });
  }
};
followController.getMemberFollowings = async (req, res) => {
  try {
    console.log("GET, cont/getMemberFollowings");

    const follow = new Follow();
    const result = await follow.getMemberFollowingsData(req.query);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getMemberFollowings`);
    res.json({ state: "fail", message: err.message });
  }
};
followController.getMemberFollowers = async (req, res) => {
  try {
    console.log("GET, cont/getMemberFollowers");

    const follow = new Follow();
    const result = await follow.getMemberFollowersData(req.member, req.query);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getMemberFollowers`);
    res.json({ state: "fail", message: err.message });
  }
};