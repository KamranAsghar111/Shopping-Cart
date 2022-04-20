const express = require("express");
require("../db/mongoose");
const auth = require("../middleware/auth")
const Product= require("../models/product")
const {addProduct,getProduct,deleteProduct,getProductById} = require("../controllers/product");
const router = express.Router();
router.post("/product/addProduct",auth,addProduct );
router.get("/product/getProduct",auth,getProduct );
router.get("/product/getProduct/:id",auth,getProductById );
router.delete("/product/deleteProduct/:id",deleteProduct );


module.exports = router;














// const express = require("express");
// const router = require("express").Router();
// const productController = require("./controller");
// router.get("/", productController.getProducts);
// router.get("/:id", productController.getProductById);
// router.delete("/:id", productController.removeProduct);
// module.exports = router;







// const Product = require("./model");
// exports.products = async () => {
//     const products = await Product.find();
//     return products;
// };
// exports.productById = async id => {
//     const product = await Product.findById(id);
//     return product;
// }
// exports.createProduct = async payload => {
//     const newProduct = await Product.create(payload);
//     return newProduct
// }
// exports.removeProduct = async id => {
//     const product = await Product.findByIdAndRemove(id);
//     return product
// }