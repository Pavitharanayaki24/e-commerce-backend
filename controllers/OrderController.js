const CartModel = require("../modeles/CartModel");
const OrderModel = require("../modeles/OrderModel");
const { GetProduct } = require("../Services/OrderServices");

const Orderproduct = async (req, res) => {
    const user_id = req.user;
    const { cust_name, cust_phone, cust_address, user_email } = req.body;

    try {
        console.log(user_id);
        const cart = await CartModel.findOne({ id: user_id });
        console.log(cart);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const { ProductDetails, subtotal } = await GetProduct(cart.products);
        console.log(ProductDetails, subtotal);

        const order = new OrderModel({
            cust_name,
            cust_phone,
            cust_address,
            Orderdate: new Date(),
            EstdatedDate: new Date().setDate(new Date().getDate()+10),
            products: ProductDetails.map(product => ({
                product_id: product.product_id,
                quantity: product.quantity
            })),
            total_amount: subtotal,
            Order_status: 'Pending',
            user_id,
            user_email
        });

        await order.save();
        await CartModel.deleteOne({ id: user_id });

        res.status(201).json({ message: 'Order created successfully', order });

    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = { Orderproduct };
