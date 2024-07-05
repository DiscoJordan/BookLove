const jwt = require("jsonwebtoken");

const verify_token = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("Not authorized!! - No token!!");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).send("Not authorized!! - Token not validated!!");
    } else {
      req._id = user.id;
      req.username = user.userName;
      req.token = token;
      next();
    }
  });
};

const verify_tokenAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("Not authorized!! - No token!!");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).send("Not authorized!! - Token not validated!!");
    } else {
      if (user.isAdmin) {
        req._id = user.id;
        req.username = user.userName;
        req.token = token;
        next();
      } else {
        res.status(403).send("You are not an admin - not authenticated !!");
      }
    }
  });
};

module.exports = {
  verify_token,
  verify_tokenAdmin,
};
