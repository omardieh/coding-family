const jwt = require("jsonwebtoken");

const generateJWT = ({ exp, iat, ...payload }, state) =>
  jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: state?.refresh ? "1d" : "5m",
  });

const verifyJWT = (token) => jwt.verify(token, process.env.JWT_TOKEN_SECRET);

function isAuthenticated(req, res, next) {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];
  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  try {
    const payload = verifyJWT(accessToken);
    req.payload = payload;
    next();
  } catch (error) {
    if (!refreshToken) {
      res.status(401).send("Access Denied. No refresh token provided.");
      next(error);
      return;
    }
    try {
      const payload = verifyJWT(refreshToken);
      const accessToken = generateJWT(payload);
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken)
        .send(payload);
    } catch (error) {
      res.status(400).send("Invalid Token.");
      next(error);
    }
  }
}

module.exports = {
  isAuthenticated,
  generateJWT,
  verifyJWT,
};
