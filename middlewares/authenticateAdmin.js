const jwt = require("jsonwebtoken");

exports.authAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }
  try {
    // verify admin access token
    const key = process.env.SECRET_KEY;
    const dToken = jwt.verify(token, key);
    // console.log(dToken);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token!" });
  }
};
