const pool = require("../db/dbPool");

module.exports = {
  async savebooking(req, res) {
    const { firstname, lastname, check_in, check_out, roomtype } = req.body;
    try {
      // check to see if db(room) has vacancy for roomtype of choice
      // if it does collect the room id and number
      // set that entry's vacant to FALSE.
      // if not, send error message and return out of function
      const roomVacancyRequest = await pool.query(
        "select id, number from room where vacant=TRUE AND roomtypeid=$1;",
        [roomtype]
      );

      let roomVacantNumber = null;
      let roomVacantId = null;

      // if there are no more rooms
      if (roomVacancyRequest.rowCount === 0) {
        // No empty rooms free
        res.send({ message: "Room Not available!" });
        console.log("No available room");
        return;
      } else {
        // collect roomid and room number
        roomVacantNumber = roomVacancyRequest.rows[0].number;
        roomVacantId = roomVacancyRequest.rows[0].id;
        // set room vacancy to FALSE
        await pool.query("UPDATE room SET vacant = FALSE WHERE id=$1", [
          roomVacantId,
        ]);
      }

      const guestInsertReturn = await pool.query(
        "INSERT INTO guest (firstname, lastname) VALUES ($1, $2) RETURNING id;",
        [firstname, lastname]
      );
      const bookingInsertReturn = await pool.query(
        "INSERT INTO booking (check_in, check_out) VALUES (TO_DATE($1, 'DD-MM-YYYY'), TO_DATE($2, 'DD-MM-YYYY')) RETURNING id;",
        [check_in, check_out]
      );
      // find the guestID
      const guestId = guestInsertReturn.rows[0].id;

      // find the bookingID
      const bookingId = bookingInsertReturn.rows[0].id;

      // store guestID, bookingID and roomID in records
      await pool.query(
        "INSERT INTO records (guestid, roomid, bookingid) VALUES ($1, $2, $3);",
        [guestId, roomVacantId, bookingId]
      );
      res.send({ message: "Booking successful." });
    } catch (err) {
      console.log("Error in BookingController");
      console.log(err.message);

      res.status(500).send({
        message: "Opps something wrong with the booking",
        error: err.message,
      });
    }
  },
};
