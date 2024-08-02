
const express = require('express');
const Router = express.Router();
const UserRoute = require('../controllers/Usercontroller'); 

Router.post("/user", UserRoute.PostProduct);
Router.put("/users",UserRoute.UpdateUser);
Router.post("/useres", UserRoute.login);

module.exports = Router;
