const pool = require("../db/dbPool");

module.exports = {
  async index(req, res) {
    let guests;
    try {
      guests = await pool.query("SELECT * FROM guest");
    } catch (error) {
      res.status(500).send(error.message);
    }
    res.status(200).send(guests.rows);
  },
};
