const express = require("express");
const cors = require("cors");

//Models
const db = require("./models");

//Routes Index
const Routes = require("./routes");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync Database
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to REST API",
  });
});

app.use("/v1", Routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Success running on port ${PORT}`);
});
