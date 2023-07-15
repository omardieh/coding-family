const mongoose = require("mongoose");

const isMongoError = (projectId) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return true;
  }
  return false;
};

module.exports = { isMongoError };
