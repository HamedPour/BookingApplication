module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Express is read!");
  });
};
