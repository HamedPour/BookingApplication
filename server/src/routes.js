const GuestController = require("./controllers/GuestController");
const BookingController = require("./controllers/BookingController");

module.exports = (app) => {
  app.get("/guests", GuestController.index);
  app.post("/storebooking", BookingController.savebooking);
};
