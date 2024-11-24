const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.CONNECTION_STRING;
console.log("chaine de caractère connection string : " + connectionString);

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 2000,
})
  .then(() => console.log("Database connected 🥳"))
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données :", error.message);
    process.exit(1); // Stoppe le serveur si la connexion échoue
  })