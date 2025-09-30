const express = require("express");
const path = require("path");
const app = express();

// On donne accès à Bootstrap depuis node_modules
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

// On dit à Express d'utiliser le dossier "public" pour les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Lancement du serveur sur le port 3000
app.listen(3000, () => {
  console.log("✅ Serveur démarré : http://localhost:3000");
});