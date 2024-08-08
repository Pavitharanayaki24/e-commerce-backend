const express = require('express');
const Router =express.Router();
const productController = require("../controllers/ProductController");
const auth = require("../middleware/auth");

Router.get("/products", auth,productController.getAllProduct);
Router.post("/product", productController.postProduct);
Router.put("/producte/:id", productController.updateProduct);
Router.delete("/productes/:id", productController.deleteProduct);
module.exports = Router;