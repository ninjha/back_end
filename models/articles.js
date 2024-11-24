const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Renommé de "name" à "title" pour correspondre au front-end
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Référence à l'utilisateur dans la collection "users"
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Ajout de la date de création pour un historique
  },
});

const Article = mongoose.model("articles", articleSchema);

module.exports = Article;