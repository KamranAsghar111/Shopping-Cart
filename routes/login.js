const express = require("express");
require("../db/mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const login = require("../controllers/login");
router.post("/login",auth, login);

module.exports = router;
