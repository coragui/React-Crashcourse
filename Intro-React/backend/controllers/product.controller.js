import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req,res) =>
{
    try
    {
        const products = await Product.find({});
        res.status(200).json({susccess:true, data:products, message:"Here's a list of all the products"});
    }
    catch (error)
    {
        console.error("Error in fetching product:",error.message);
        return res.status(500).json({success:false, message:"Server Error"});
    }
};

export const createProduct = async (req,res ) =>
{
    const product = req.body;

    if(!product.name || !product.price || !product.image)
    {
        return res.status(400).json({success:false, message:"Please provide all fields"});       
    }
    
    const newProduct = new Product(product);

    try
    {
        await newProduct.save()
        res.status(201).json({success: true, data: newProduct});
    }
    catch(error)
    {
        console.error("Error in create product:",error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }

};

export const updateProduct = async (req,res) => 
{
    const {id} = req.params;
    
    const product = req.body;

    const valid_id = mongoose.Types.ObjectId.isValid(id);
    if(!valid_id)
    {
        return res.status(404).json({sucess:false, message:"Invalid Product id"})
    }

    try
    {
        const updatedProduct = await Product.findByIdAndUpdate(id,product, {new:true});
        res.status(200).json({success:true, data:updatedProduct, message:"The product has been updated"});
    }
    catch(error)
    {
        res.status(500).json({success:false,messsage:"Server Error"})
    }
};

export const deleteProdct = async (req,res) =>
{
    const {id} = req.params;
    
    const valid_id = mongoose.Types.ObjectId.isValid(id);
    if(!valid_id)
    {
        return res.status(404).json({sucess:false, message:"Invalid Product id"})
    }

    try
    {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product deleted"});
    }
    catch (error)
    {
        console.error("Error in deleting product:",error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
};