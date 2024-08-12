const profileRouter = require("express").Router();
const User = require("../../models/User.model");

profileRouter.get("/", (req, res) => {
  const { _id } = req.payload;
  User.findById(_id)
    .then((foundUser) => {
      if (!foundUser) {
        res.status(404).json("User not found");
        return;
      }
      const {
        _id,
        username,
        email,
        country,
        avatar,
        bio,
        website,
        socialMedia,
        following,
        followers,
      } = foundUser;

      res.send({
        _id,
        username,
        email,
        country,
        avatar,
        bio,
        website,
        socialMedia,
        following,
        followers,
      });
    })
    .catch((err) => res.json(err));
});

profileRouter.patch("/", async (req, res) => {
  const { _id } = req.payload;
  try {
    const foundUser = await User.findOne({
      username: req.body.username,
    });

    if (foundUser && JSON.stringify(foundUser._id) !== JSON.stringify(_id)) {
      res.status(409).json("Username already in use");
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    const {
      username,
      email,
      country,
      avatar,
      bio,
      website,
      socialMedia,
      following,
      followers,
    } = updatedUser;
    res.json({
      username,
      email,
      country,
      avatar,
      bio,
      website,
      socialMedia,
      following,
      followers,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = profileRouter;
