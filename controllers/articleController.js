const Article = require("../models/articles");
const { checkBody } = require("../modules/utils");

// Création d'un nouvel article
exports.create = async (req, res) => {
  const { title, content, author } = req.body;

  // Vérifie que tous les champs requis sont présents
  if (!checkBody(req.body, ["title", "content", "author"])) {
    return res
      .status(400)
      .json({ result: false, error: "All fields are required." });
  }

  try {
    const newArticle = new Article({
      title: title.trim(),
      content,
      author,
    });

    const savedArticleData = await newArticle.save();
    res.json({ result: true, message: "Article created successfully.", data: savedArticleData });
  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error);
    res.status(500).json({ result: false, error: "Internal server error." });
  }
};

// Suppression d'un article
exports.remove = async (req, res) => {
  const id = req.params.articleId;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ result: false, message: "Article not found." });
    }

    await Article.deleteOne({ _id: id });
    res.json({ result: true, message: "Article deleted successfully." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    res.status(500).json({ result: false, error: "Internal server error." });
  }
};

// Modification d'un article
exports.edit = async (req, res) => {
  const id = req.params.articleId;
  const { title, content } = req.body;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ result: false, message: "Article not found." });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title: title.trim(), content },
      { new: true } // Retourne l'article mis à jour
    );

    res.json({ result: true, message: "Article updated successfully.", data: updatedArticle });
  } catch (error) {
    console.error("Erreur lors de la modification de l'article :", error);
    res.status(500).json({ result: false, error: "Internal server error." });
  }
};

// Récupération de tous les articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find(); // Récupère tous les articles
    res.status(200).json({ result: true, data: articles });
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    res.status(500).json({ result: false, error: "Internal server error." });
  }
};

// Récupération d'un article par son ID
exports.getArticleById = async (req, res) => {
  const articleId = req.params.articleId;

  try {
    const article = await Article.findById(articleId);

    if (!article) {
      return res
        .status(404)
        .json({ result: false, message: "Article not found." });
    }

    res.status(200).json({ result: true, data: article });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article :", error);
    res.status(500).json({ result: false, error: "Internal server error." });
  }
};
