const pool = require("./db/dbPool");
const guestController = require("./controllers/guestController");

module.exports = (app) => {
  app.get("/", guestController.index);
};
