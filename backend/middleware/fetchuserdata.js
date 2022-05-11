const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.REACT_JWT_SECRET;

const fetchuserdata = (req, res, next) => {
  const token = req.header("auth-token");
  try {
    if (!token) {
     return res.status(401).json({
        error: "Authinticate using a valid token ",
      });
    } 
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      next();
    
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = fetchuserdata;
