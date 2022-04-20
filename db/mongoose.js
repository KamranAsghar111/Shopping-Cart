const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Shopping-Cart")
  .then(() => {
    console.log("connection successful");
  })
  .catch((e) => {
    console.log(e);
  });

  
//D:\2-Techling\mongodb\bin\mongod.exe --dbpath=D:\2-Techling\mongodb-data