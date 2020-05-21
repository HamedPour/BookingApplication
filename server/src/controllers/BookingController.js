const pool = require("../db/dbPool");

module.exports = {
  async savebooking(req, res) {
    debugger;
    const { firstname, lastname, check_in, check_out, roomtype } = req.body;

    try {
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

      // store user in room
      let guestRoomType = Math.floor(Math.random() * 100);
      // NOTE TO SELF: THIS IS NOT HOW WE DO ROOM NUMBER - FIX THIS LATER
      const roomNumber = 100 + guestRoomType;
      const roomInsertReturn = await pool.query(
        "INSERT INTO room (number, roomtypeid) VALUES ($1, $2) RETURNING id;",
        [roomNumber, roomtype]
      );

      // // find roomID
      const roomId = roomInsertReturn.rows[0].id;

      // // store guestID, bookingID and roomID in records
      await pool.query(
        "INSERT INTO records (guestid, roomid, bookingid) VALUES ($1, $2, $3);",
        [guestId, roomId, bookingId]
      );
    } catch (error) {
      res.sendStatus(500).send(error.message);
    }
    res.sendStatus(200).send({ message: "Guest created successfully" });
  },
};
