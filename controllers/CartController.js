const CartModel = require("../modeles/CartModel");
const ProductModel= require("../modeles/ProductModel");
const service = require("../Services/cartServices")
const addtoCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const id = req.user;

  try {
    const cart = await CartModel.findOne({ id: id });
    if (cart) {
      const oldProduct = cart.products.find((p) => p.product_id === product_id);
      if (oldProduct) {
        oldProduct.quantity += quantity;
      } else {
        cart.products.push({ product_id, quantity });
      }
      await cart.save();

      return res.status(200).json({ message: "Product added to cart" });
    } else {
      const newCart = new CartModel({
        id,
        products: [{ product_id, quantity }],
      });
      await newCart.save();
      return res.status(200).json({ message: "Product added to cart" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const displayProduct = async (req, res) => {
  const id = req.user;
  try {
    const products = await CartModel.findOne({ id });
    if (!products) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ products: products });
    console.log(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//MAPPINNG THE CART PRODUCTS WITH ITS DETAILS
const MapProduct = async (req, res) => {
    const id = req.user;
    let subtotal=0;
  
    try {
      const cart = await CartModel.findOne({ id });
      if (!cart) {
        return res.status(401).json({ message: "Cart Not Found" });
      }
       const productDetails = await Promise.all(cart.products.map(async (element) => {
       const product = await ProductModel.findOne({ id: element.product_id }); 
        if (product) {
            //SUBTOTAL OF PRODUCTS IN CART
            const productTotal= product.price*element.quantity;
            subtotal+= productTotal;
          return {
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price,
            quantity: element.quantity 
          };
        } else {
          return null;         }
      }));
  
      res.status(200).json({ message: "Products retrieved", products: productDetails,subtotal: subtotal });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
// DELETE PRODUCT
  const deleteProduct = async (req, res) => {
    const userId = req.user; 
    const  product_id  = req.body.id; 
console.log(product_id,userId);
   
    try {
        const cart = await CartModel.findOne({ id: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const cartIndex = cart.products.findIndex((product) => product.product_id === product_id);
        console.log(cartIndex);
        if (cartIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        cart.products.splice(cartIndex, 1);

        if (cart.products.length > 0) {
            await cart.save();
        } else {
            await CartModel.deleteOne({ id: userId });
        }
        res.status(200).json({ message: "Product removed successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};




  module.exports = {addtoCart,MapProduct,displayProduct,deleteProduct};
  

























































































