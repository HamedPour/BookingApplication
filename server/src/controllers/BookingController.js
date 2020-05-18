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
      const guestID = guestIdRequest.rows[0].max;

      // find the bookingID
      const bookingIdRequest = await pool.query("SELECT MAX(id) from booking");
      const bookingId = bookingIdRequest.rows[0].max;
      console.log(bookingId);
      // store user in room
      /* WHERE ARE HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */
      // find roomID
      // store guestID, bookingID and roomID in records
    } catch (error) {
      res.status(500).send(error.message);
    }

    res.send("OK");
  },
};
