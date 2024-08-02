const Cart =require("../modeles/CartModel");

const deleteProduct= async(req,res)=>{
    const id=req.user;
    const productid=req.body;
    con
    try{
        const cart= await Cart.findOne({id});
        if(!cart){
            res.status(404).send({message:"cart not found"});
        }
        cart.products=cart.products.filter((prod) => prod.product_id !== productid);
        await cart.save();
        res.status(200).send({message:"product removed successfully"});
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
}
module.exports = deleteProduct;

