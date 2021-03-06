const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./config/database");

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error:", err));

const app = express();

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Here we set the static folder to use
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("cool");
});

// Routes regarding recipes are taken care of here
app.use("/recipes", require("./routes/recipes"));

// The port is setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
