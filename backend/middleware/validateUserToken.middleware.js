const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token not provided" });
  token = token.split(" ")[1];
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, decoded) => {
    if (error) return res.status(401).json({ message: "Unauthorized" });
    req.payload = { ...decoded, isAuthenticated: true };
    next();
  });
};
