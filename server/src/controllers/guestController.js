const pool = require("../db/dbPool");

module.exports = {
  async index(req, res) {
    let guests;
    try {
      guests = await pool.query(
        "SELECT g.id, g.firstname, g.lastname, b.check_in, b.check_out FROM guest AS g INNER JOIN booking AS b ON b.id=g.id;"
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
    res.status(200).send(guests.rows);
  },
  async delete(req, res) {
    const guestId = req.params.id;
    try {
      // find roomid of guest from records
      const roomIdRequest = await pool.query(
        "SELECT roomid FROM records WHERE guestid=$1",
        [guestId]
      );
      const roomId = roomIdRequest.rows[0].roomid;
      // find bookingid of guest
      const bookingIdRequest = await pool.query(
        "SELECT bookingid FROM records WHERE guestid=$1",
        [guestId]
      );
      const bookingId = bookingIdRequest.rows[0].bookingid;

      // delete records using guestid
      await pool.query("DELETE FROM records WHERE guestid=$1", [guestId]);

      // delete room entry
      await pool.query("DELETE FROM room WHERE id=$1", [roomId]);

      // delete booking entry
      await pool.query("DELETE FROM booking WHERE id=$1", [bookingId]);

      // delete guest entry
      await pool.query("DELETE FROM guest WHERE id=$1", [guestId]);
      // If noting goes wrong send res back aokay!
      res.status(200).send({ message: "User records deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },
};
