const CartModel = require("../modeles/CartModel");
const OrderModel = require("../modeles/OrderModel");
const productModel = require("../modeles/ProductModel");


const makeorder=async(req,res)=>{
    const userid=req.user.userId;
    const user_email=req.user.email;
    console.log(user_email,userid);
    const {cust_name,cust_phone,cust_address}=req.body;
    let OrderDate = new Date().toLocaleDateString("de-DE");
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 10);
    let EstdatedDate = currentDate.toLocaleDateString("de-DE");
    console.log(EstdatedDate);
    const Order_status="completed";
    try {
        const cart=await CartModel.findOne({id:userid});
    if (cart) {
        console.log(cart);
      let subtotal = 0
      console.log(cart.products)
      await Promise.all(
        cart.products.map(async (item) => {
            console.log(item)
          const product = await productModel.findOne({ id: item.product_id });
          subtotal += product.price * item.quantity
        })
      );
        const order=new OrderModel({
            user_id:userid,
            user_email,
            cust_name,
            cust_phone,
            cust_address,
            OrderDate,
            EstdatedDate,
            total_amount:subtotal,
            Order_status,
            products:cart.products});
        await order.save();
        await CartModel .deleteOne({id:userid});
        res.status(200).json({message:"Order Placed..."});
    }else{
      res.status(404).json({message:"No Products found"});
    }
}catch(e){
    res.status(500).send({error:e,message:"Can't place order"});
}
    
}

/*const MyOrder = async(req,res)=>{
     const user_id= req.user;
     try{
        const orders= await OrderModel.findOne({user_id});
        if(!orders){
            res.status(404).json({message:'No order found'});
        }
        const Orderdetails= await Promise.all(orders.products.map(async(item)=>{
            const product= await productModel.findOne(id.item.product_id)
              return{

              }
        }))
     }
}*/




module.exports = { makeorder };
