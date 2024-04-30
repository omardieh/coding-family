const jwt = require("jsonwebtoken");

// const isAuthenticated = jwt({
//   secret: process.env.JWT_TOKEN_SECRET,
//   algorithms: ["HS256"],
//   requestProperty: "payload",
//   getToken: getTokenFromHeaders,
// });

// function getTokenFromHeaders(req) {
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.split(" ")[0] === "Bearer"
//   ) {
//     const token = req.headers.authorization.split(" ")[1];
//     return token;
//   }
//   return null;
// }

function isAuthenticated(req, res, next) {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];
  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET);
    req.payload = decoded;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_TOKEN_SECRET);
      const accessToken = jwt.sign(decoded, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken)
        .send(decoded);
    } catch (error) {
      return res.status(400).send("Invalid Token.");
    }
  }
}

module.exports = {
  isAuthenticated,
};
