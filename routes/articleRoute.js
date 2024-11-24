var express = require("express");
const {
  create,
  edit,
  remove,
  getAllArticles,
  getArticleById,
} = require("../controllers/articleController");

var router = express.Router();

router.post("/create", create);

router.patch("/:articleId", edit);

router.delete("/:articleId", remove);

router.get("/", getAllArticles);

router.get("/:articleId", getArticleById);

module.exports = router;
