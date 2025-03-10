import { ProductModel } from "../models/product.js";
import { addProductsValidator } from "../validators/product.js";

export const addProducts = async (req, res, next) => {
 try {
   //upload product image
   // validate product info
   const {error, value} = addProductsValidator.validate(req.body, {abortEarly: false});
   if (error){
    return res.status(422).json(error)
   }
   // save product info in database
   const result = await ProductModel.create(value);
   // return response
   res.status(201).json(result);
 } catch (error) {
    next(error);
 }
}

export const getProducts = async (req, res, next) => {
  try {
    // fetch products from database
    const result = await ProductModel.find();
    // return response
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export const countProducts = (req, res) => {
  res.send('All products count!');
}

export const updateProduct = (req, res) => {
  res.send(`Product with id ${req.params.id} updated`);
}

export const deleteProduct = (req, res) => {
  res.send(`Product with id ${req.params.id} deleted`);
}

