const guestController = require("./controllers/guestController");

module.exports = (app) => {
  app.get("/guests", guestController.index);
};
