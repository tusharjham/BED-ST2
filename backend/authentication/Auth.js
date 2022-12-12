const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    let token = req.headers.cookie;
    token = token.substring(6);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      throw new Error("COOKIE EXPIRED");
    }
    console.log("authentication succesful");
    next();
  } catch (err) {
    console.log("auth fail");
    res.status(400).send(err.toString());
  }
};

module.exports = { auth };
