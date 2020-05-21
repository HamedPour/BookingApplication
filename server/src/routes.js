const GuestController = require("./controllers/GuestController");
const BookingController = require("./controllers/BookingController");

module.exports = (app) => {
  app.get("/guests", GuestController.index);
  app.delete("/guests/:id", GuestController.delete);
  app.post("/booking", BookingController.savebooking);
};
