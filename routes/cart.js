const express = require("express")
require("../db/mongoose");
const auth=require("../middleware/auth")
const {createCart,getCart,deleteCart}= require("../controllers/cart");
const router = express.Router();
router.post("/cart",auth,createCart );
router.get("/cart",auth,getCart );
router.delete("/cart",auth,deleteCart );

module.exports = router;  