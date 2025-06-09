const express = require("express");
const cors = require("cors");
const bodyParser = require("express").json;
const sequelize = require("./db");
const helmet = require("helmet");
const notesRoute = require("./routes/notes");

const app = express();
const port = 5001;
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(bodyParser());
app.use(cors(corsOptions));
app.use(helmet());

app.use("/notes", notesRoute);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Sync db successful");
    app.listen(port, () => {
      console.log(`API access at: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error db sync", err);
  });
