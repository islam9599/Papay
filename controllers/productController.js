const assert = require("assert");
const Definer = require("../lib/mistake");
const Product = require("../models/Product");

let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMYRestaurantData");
  } catch (err) {
    console.log(`ERROR, cont/getMyRestaurantData, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
productController.addNewProduct = async (req, res) => {
  try {
    console.log("POST: cont/addNewProduct");
    // console.log(req.files);
    assert(req.files, Definer.general_err3);

    const product = new Product();

    let data = req.body;
    // console.log(data);
    data.product_images = req.files.map((ele) => {
      return ele.path;
    });

    // console.log(data);

    const result = await product.addNewProductData(data, req.member);
    // assert.ok(result, Definer.product_err1);

    // console.log(req.member);

    // TODO: product creation controller

    // res.json({ test: "ok" });
    // res.send("OK");
    const html = `<script>
                    alert(new dish added successfully);
                    window.location.replace("/resto/products/menu")
                  </script>`;
    res.end(html);
  } catch (err) {
    console.log(`ERROR, cont/addNewProduct, ${err.message}`);
  }
};
productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/updateChosenProduct");
    const product = new Product();
    const id = req.params.id;
    console.log(id);
    const result = await product.updateChosenProductData(
      id,
      req.body,
      req.member._id
    );
    await res.json({ state: "sucess", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateChosenProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
