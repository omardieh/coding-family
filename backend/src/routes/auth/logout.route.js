const express = require('express');
const { isAuthenticated } = require('../../middleware/jwt.middleware');
const logoutRouter = express.Router();

logoutRouter.get('/', isAuthenticated, (req, res) => {
  res.clearCookie('refreshToken');
  res.removeHeader('Authorization');
  res.status(200).send({ success: true });
});

module.exports = { logoutRouter };
