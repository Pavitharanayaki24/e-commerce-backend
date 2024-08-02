const mongoose= require('mongoose');

const cartschema= new mongoose.Schema({
    id:{
        type: String,
        required: true,
       
    },
    products:[{
        product_id:{
            type:String,
        },
        quantity:
        {
            type:Number,
        }
}],
        
    }   
);

const CartModel=mongoose.model('Cart', cartschema);
module.exports=CartModel;