const express = require("express");
require("./db/mongoose");
const app = express();
const user = require("./routes/user");
const login = require("./routes/login");
const Products = require("./routes/product");
const cart = require("./routes/cart")
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(user);
app.use(login);
app.use(Products)
app.use(cart)
app.listen(port,() => {
    console.log(`Application is running on ${port}`);
});




