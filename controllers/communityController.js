const assert = require("assert");
const Definer = require("../lib/mistake");
const Community = require("../models/Community");

let communityController = module.exports;

communityController.imageInsertion = async (req, res) => {
  try {
    console.log("POST, cont/imageInsertion");
    assert.ok(req.file, Definer.general_err3);

    const image_url = req.file.path;
    res.json({ state: "success", data: image_url });
  } catch (err) {
    console.log(`ERROR, cont/imageInsertion`);
    res.json({ state: "fail", message: err.message });
  }
};
communityController.createArticle = async (req, res) => {
  try {
    console.log("POST, cont/createArticle");
    assert.ok(req.member, Definer.general_err1);

    const community = new Community();
    const result = await community.createArticleData(req.member, req.body);
    assert.ok(result, Definer.general_err1);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/createArticle`);
    res.json({ state: "fail", message: err.message });
  }
};
communityController.getMemberArticles = async (req, res) => {
  try {
    console.log("GET, cont/getMemberArticles");
    const community = new Community();

    const mb_id =
      req.query.mb_id !== "none" ? req.query.mb_id : req.member?._id;
    assert.ok(mb_id, Definer.article_err1);

    const result = await community.getMemberArticlesData(
      req.member,
      mb_id,
      req.query
    );
    assert.ok(result, Definer.general_err1);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getMemberArticles`);
    res.json({ state: "fail", message: err.message });
  }
};
communityController.getArticles = async (req, res) => {
  try {
    console.log("GET, cont/getArticles");

    const community = new Community();
    const result = await community.getArticlesData(req.member, req.query);
    assert.ok(result, Definer.general_err1);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getArticles`);
    res.json({ state: "fail", message: err.message });
  }
};
communityController.getChosenArticle = async (req, res) => {
  try {
    console.log("GET, cont/getChosenArticle");

    const art_id = req.params.art_id;

    const community = new Community();
    const result = await community.getChosenArticleData(req.member, art_id);
    assert.ok(result, Definer.general_err1);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getChosenArticle`);
    res.json({ state: "fail", message: err.message });
  }
};