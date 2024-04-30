module.exports = (app) => {
  app.use((req, res) => {
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);
    if (!res.headersSent) {
      res.redirect(process.env.CLIENT_URL);
    }
  });
};
