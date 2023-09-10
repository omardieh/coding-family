const uploadRouter = require("express").Router();
const User = require("../../models/User.model");
const fileUploader = require("../../config/cloudinary.config");

uploadRouter.post("/", fileUploader.single("user-avatar"), (req, res) => {
  User.findByIdAndUpdate(
    req.body.userID,
    { avatar: req.file.path },
    { new: true }
  )
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => res.json(err));
});

module.exports = uploadRouter;
