require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });
    }

    const token = authorization.replace("Bearer ", "");
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    }

    req.user = verified.id;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Invalid token, authorization denied" });
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
