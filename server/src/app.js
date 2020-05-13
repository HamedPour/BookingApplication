const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const config = require("./config/config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("short"));

require("./routes.js")(app);

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
