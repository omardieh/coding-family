module.exports = (error, req, res) => {
  if (error.name === "ValidationError") {
    let key;
    console.log(req.body);
    Object.keys(req.body).forEach((element) => {
      if (error.errors[element]) {
        key = element;
      }
    });
    console.log(key);
    console.log("error:", error);
    const errorMessage = error.errors[key].message;
    res.status(400).json(errorMessage);
  }
};
