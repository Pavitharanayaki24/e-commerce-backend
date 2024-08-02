const express= require("express");
const app = express();
const ProductRoutes= require("./routes/ProductRoutes");
const CartRoutes= require("./routes/CartRoutes");
const UserRoutes= require("./routes/UserRoutes");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const OrderRoutes = require("./routes/OrderRoutes");

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://pavitharanayakik2022it:bluesky@cluster0.srlysao.mongodb.net/yourDatabaseName')
.then(()=>{
    console.log("Mongo connected");
});
app.set('view engine', 'ejs');
app.use("/",ProductRoutes);
app.use("/",UserRoutes);
app.use("/",CartRoutes);
app.use("/",OrderRoutes);
app.listen(3000,()=>{
    console.log("Server Started");
})