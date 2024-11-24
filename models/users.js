const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique pour éviter les doublons
  password: { type: String, required: true }, // Le mot de passe sera hashé avant d'être sauvegardé
  createdAt: {
    type: Date,
    default: Date.now, // Date de création de l'utilisateur
  },
  // token: String, // À activer si tu veux gérer des tokens stockés côté serveur
  // canBookmark: Boolean, // Optionnel : pour une fonctionnalité de favoris
});

const User = mongoose.model("user", userSchema);

module.exports = User;
