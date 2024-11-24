const bcrypt = require("bcrypt");
const User = require("../models/users");
const { checkBody } = require("../modules/utils");

// Enregistrement d'un utilisateur
exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Vérification des champs requis
  if (!checkBody(req.body, ["username", "password"])) {
    return res
      .status(400)
      .json({ result: false, error: "Missing or empty fields." });
  }

  try {
    // Vérifie si l'utilisateur existe déjà
    const isUserExists = await User.findOne({ username });
    if (isUserExists) {
      return res
        .status(400)
        .json({ result: false, error: "User's username already exists." });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création et enregistrement de l'utilisateur
    const newUser = new User({
      username: username.trim(),
      password: hashedPassword,
    });

    const savedUserData = await newUser.save();
    res.json({ result: true, message: "User created successfully.", user: savedUserData });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    res.status(500).json({ result: false, error: "Internal server error." });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Vérification des champs requis
  if (!checkBody(req.body, ["username", "password"])) {
    return res
      .status(400)
      .json({ result: false, error: "Missing or empty fields." });
  }

  try {
    // Recherche de l'utilisateur dans la base
    const isUserFound = await User.findOne({ username });
    if (!isUserFound) {
      return res.status(404).json({ result: false, error: "User not found." });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, isUserFound.password);
    if (!isPasswordValid) {
      return res.status(400).json({ result: false, error: "Bad credentials." });
    }

    // Exemple de session ou token (remplace par JWT si besoin)
    res.json({ result: true, message: "User connected", userId: isUserFound._id });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ result: false, error: "Internal server error." });
  }
};

// Déconnexion d'un utilisateur
exports.logout = async (req, res) => {
  // Ici, tu peux supprimer un token ou une session si implémenté
  res.json({ result: true, message: "User logged out." });
};

