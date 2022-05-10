const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Response notes");
});

module.exports = router;
