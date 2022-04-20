const Product = require("../models/product");

 const addProduct = async (req, res) => {
  
  
  try {
    const product = new Product({
        ...req.body,
        owner: req.user._id
    })
    
    await product.save()
    
    res.status(201).send(product)
  }
    catch (error) {
      res.status(400).send(error);
    }
  };

  const getProduct = async (req, res) => {
    try {
      
      const getProduct = await Product.find();
      res.send(getProduct);
    } catch (error) {
      res.send("Product is not found" + error).status(400);
    }
  };

  const getProductById = async (req, res) => {
    try {
      const _id = req.params.id;
      const getProductById = await Product.findById(_id);
      res.send(getProductById);
    } catch (error) {
      res.send("Product is not found" + error).status(400);
    }
  };
  const deleteProduct = async (req, res) => {
    try {
      const _id = req.params.id;
      const deleteProduct = await Product.findByIdAndDelete(_id);
      res.send("Product Delete Successful");
    } catch (error) {
      res.send(error);
    }
  };

module.exports = {addProduct,getProduct,deleteProduct,getProductById};





















