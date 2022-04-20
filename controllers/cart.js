const Cart = require("../models/cart");
const Product = require("../models/product");

const getCart = async (req, res) => {
  const owner = req.user._id;

  try {
    const cart = await Cart.findOne({ owner });
    if (cart && cart.products.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send("Cart is not available");
    }
  } catch (error) {
    res.status(500).send();
  }
};

const createCart = async (req, res) => {
  const owner = req.user._id;

  const { productId, quantity } = req.body;
  console.log(productId);
  try {
    const cart = await Cart.findOne({ owner });
    const product = await Product.findOne({ _id: productId });
    
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }
    const price = product.price;
    const name = product.name;
    

    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) => product.productId == productId
      );

      if (productIndex > -1) {
        let pro = cart.products[productIndex];
        pro.quantity += quantity;

        cart.bill = cart.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);
        cart.products[productIndex] = pro;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.products.push({ productId, name, quantity, price });
        cart.bill = cart.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);

        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      const newCart = await Cart.create({
        owner,
        products: [{ productId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
};
const deleteCart = async (req, res) => {
  const owner = req.user._id;
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  try {
    let cart = await Cart.findOne({ owner });

    const productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );
    console.log(productIndex);
    if (productIndex > -1) {
      let product = cart.products[productIndex];
      console.log(cart.bill);
      cart.bill -= quantity * product.price;
      if(quantity>=product.quantity){
        res.send("Number of quantity is out of range")
      }
      product.quantity -= quantity;
      console.log(cart.bill);
      if (cart.bill < 0) {
        cart.bill = 0;
      }

      cart = await cart.save();

      res.status(200).send(cart);
    } else {
      res.status(404).send("product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};
module.exports = { createCart, getCart, deleteCart };
