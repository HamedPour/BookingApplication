const pool = require("../db/dbPool");

module.exports = {
  async savebooking(req, res) {
    const { firstname, lastname, check_in, check_out, roomtype } = req.body;

    try {
      await pool.query(
        "INSERT INTO guest (firstname, lastname) VALUES ($1, $2)",
        [firstname, lastname]
      );
      await pool.query(
        "INSERT INTO booking (check_in, check_out) VALUES (TO_DATE($1, 'DD-MM-YYYY'), TO_DATE($2, 'DD-MM-YYYY'))",
        [check_in, check_out]
      );
      // find the guestID
      const guestIdRequest = await pool.query("SELECT MAX(id) from guest");
      const guestId = guestIdRequest.rows[0].max;

      // find the bookingID
      const bookingIdRequest = await pool.query("SELECT MAX(id) from booking");
      const bookingId = bookingIdRequest.rows[0].max;

      // store user in room
      let guestRoomType = null;
      // NOTE TO SELF: CAN WE PLEASE DO THIS SWITCH ON THE CLIENT SIDE
      switch (roomtype) {
        case "Single":
          guestRoomType = 1;
          break;
        case "Double":
          guestRoomType = 2;
          break;
        default:
          guestRoomType = 3;
          break;
      }
      // NOTE TO SELF: THIS IS NOT HOW WE DO ROOM NUMBER - FIX THIS LATER
      const roomNumber = 100 + guestRoomType * 2;
      await pool.query(
        "INSERT INTO room (number, roomtypeid) VALUES ($1, $2);",
        [roomNumber, guestRoomType]
      );

      // find roomID
      const roomIdRequest = await pool.query("SELECT MAX(id) from room");
      const roomId = roomIdRequest.rows[0].max;
      // store guestID, bookingID and roomID in records
      await pool.query(
        "INSERT INTO records (guestid, roomid, bookingid) VALUES ($1, $2, $3);",
        [guestId, roomId, bookingId]
      );
    } catch (error) {
      res.status(500).send(error.message);
    }

    res.send("Booking Details Saved in Records...");
  },
};
