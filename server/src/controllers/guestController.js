const pool = require("../db/dbPool");

module.exports = {
  async index(req, res) {
    let guests;
    try {
      guests = await pool.query(
        "SELECT g.id, g.firstname, g.lastname, b.check_in, b.check_out FROM guest AS g INNER JOIN booking AS b ON b.id=g.id OR b.id!=g.id;"
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
    res.status(200).send(guests.rows);
  },
};
