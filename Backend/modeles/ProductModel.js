const mongoose = require('mongoose');
const productschema=new mongoose.Schema({
    id:String,
    title:{
        type:String,
        require:true,},
    description:{
        type:String,
        require:true,},
    catogery:String,
    image:String,
    price:{
        type:Number,
        require:true,},
    rating:{
        rate:{
            type:Number,
            },
        count:{
            type:Number,
            },
        }
        }
       
    )
    const productModel=mongoose.model('Product',productschema);
    module.exports=productModel;