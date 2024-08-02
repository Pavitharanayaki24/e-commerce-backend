const { response } = require('express');
const Productmodel=require('../modeles/ProductModel');
const { v4: uuidv4 } = require('uuid');


//GET METHOD FOR PRODUCT
const getAllProduct = async(req,res)=>{
   try{
    const products=await Productmodel.find();
    res.send(products);}
    catch(err){
        console.error(err);
    }
}

// POST METHOD FOR PRODUCT
const postProduct = async(req,res)=>{
    const{title,description,catogery,image,price,rating}=req.body;
    try{
        const newProduct= new Productmodel({ id:uuidv4(),title,
            description,
            catogery,
            image,
            price,
            rating});
            const products = await newProduct.save();
            res.send(products);
    }catch (err) {
        console.error('Error creating product:', err);
        res.status(500).send({ message: 'Error creating product', error: err.message });
    }
};

//UPDATE METHOD FOR PRODUCT
const updateProduct = async(req,res)=>{
    const{id}=req.params;
    const{title,description,catogery,image,price,rating}=req.body;
    try{
        const NewProduct=await Productmodel.findOneAndUpdate({id},
            {title,description,catogery,image,price,rating},
            {new:true,runValidators:true});
            if(!NewProduct){
                return res.send(404);
            }

            res.status(200).json({
                Msg:"success",
                NewProduct: NewProduct
            });

    }catch(err){
        console.error(err);
        res.send(404);
}};
//DELETE FOR PRODUCT

const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    try{
        const dproduct=await Productmodel.findOneAndDelete({id});
        if(!dproduct){
            return res.send("PrODUCT NOT FOUND");
        }
        res.status(200).json({
            Msg:"success fully deleted"

        })
    }catch(err){
        console.error(err);
        res.send(404);
}};
module.exports = {getAllProduct,updateProduct,postProduct,deleteProduct}; 