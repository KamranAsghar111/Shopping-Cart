const mongoose = require("mongoose")
const ObjectID = mongoose.Schema.Types.ObjectId
const productSchema = mongoose.Schema({
  owner : {
    type: ObjectID,
    required: true,
    ref: 'User'
 },
  name: {
    type: String,
    required: [true, "Please include the product name"],
  },
  price: {
    type: String,
    required: [true, "Please include the product price"],
  }
 
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;