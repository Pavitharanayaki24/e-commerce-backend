const mongoose = require('mongoose');

const OrderSchema= mongoose.Schema({
    cust_name:{
        type: 'string',
        required: true,
    },
    cust_phone:{
        type: Number,
        required: true,
    },
    cust_address:{
        type:'string',
        required: true,
    },
    Orderdate:{
        type: Date,
        
    },
    EstdatedDate:{
        type: Date,
        
    },
    products: [{
        product_id: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
        }
    }],

    total_amount:{
        type: Number
    },
    Order_status:{
        type: 'string',
    },
    user_id:{
       type: 'string',
       required: true,
    },
    user_email:{
        type: 'string',
        required: true,
    }
})
const OrderModel= mongoose.model('Order',OrderSchema);
module.exports = OrderModel;