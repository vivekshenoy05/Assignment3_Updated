const express = require("express");
const mongoose = require("mongoose");
// const logger = require("./config/logger");
const router = require("./routes/user-routes");
const app = express();
const url = require("./secret/secret");
app.use(express.json());
app.use("/users", router);
mongoose
  .connect(url)
  .then(() =>
    app.listen(8080, () =>
      // logger.log("info", "Connected and Listening on port 8080")
      console.log("Connected and Listening on port 8080")
    )
  )
  .catch((err) => console.log(err));
