module.exports = (error, req, res) => {
  if (error.name === "ValidationError") {
    let key;
    Object.keys(req.body).forEach((field) => {
      if (error.errors[field]) {
        key = field;
      }
    });
    const errorMessage = error.errors[key].message;
    console.error("error:", error);
    res.status(400).json(errorMessage);
  }
};
