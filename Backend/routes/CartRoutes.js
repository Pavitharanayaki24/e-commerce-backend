const express = require('express');
const Router=express.Router();
const CartRouter= require('../controllers/CartController');
const auth= require('../middleware/auth')

Router.post('/cart',auth,CartRouter.addtoCart);
Router.get('/carte',auth,CartRouter.displayProduct);
Router.get('/cartes',auth,CartRouter.MapProduct);
Router.delete('/cartese',auth,CartRouter.deleteProduct);
module.exports = Router;