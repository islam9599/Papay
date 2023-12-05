const assert = require("assert");
const Order = require("../models/Order");
const Definer = require("../lib/mistake");
let orderController = module.exports;

orderController.createOrder = async (req, res) => {
  try {
    console.log("POST, cont/signup");
    assert.ok(req.member, Definer.auth_err5);

    // console.log(req.body);

    const order = new Order();
    const result = await order.createOrderData(req.member, req.body);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/signup`);
    res.json({ state: "fail", message: err.message });
  }
};
