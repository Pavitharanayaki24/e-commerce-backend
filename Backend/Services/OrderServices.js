const ProductModel = require('../Backend/modeles/ProductModel');
const CartModel = require('../Backend/modeles/CartModel');

const GetProduct = async (cartProducts) => {
    let subtotal = 0;

    try {
        const productDetails = await Promise.all(cartProducts.map(async (element) => {
            const product = await ProductModel.findOne({ id: element.product_id }); 
            if (product) {
                const productTotal = product.price * element.quantity;
                subtotal += productTotal;
                return {
                    product_id: product.id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    quantity: element.quantity
                };
            } else {
                return null;
            }
        }));

      
        const ProductDetails = productDetails.filter(product => product !== null);

        return {ProductDetails, subtotal };
    } catch (err) {
        console.error(err);
        throw new Error("Server error");
    }
};

module.exports = { GetProduct };
