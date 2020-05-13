const pool = require("../db/dbPool");

module.exports = {
  index(req, res) {
    try {
      pool.query("SELECT * FROM roomtype", (err, result) => {
        pool.end();
        res.send(result.rows[0].name);
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
