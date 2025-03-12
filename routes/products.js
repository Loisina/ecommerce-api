import { Router } from "express";
import { addProducts, countProducts, deleteProduct, getProducts, updateProduct } from "../controllers/products.js";
import { localUpload, remoteUpload } from "../middlewares/upload.js";

// Create product router

const productsRouter = Router();

// define routes

productsRouter.post ('/products',remoteUpload.single('image'), addProducts);

productsRouter.get ('/products', getProducts);

productsRouter.get ('/products/count', countProducts );

productsRouter.patch ('/products/:id', updateProduct);

productsRouter.delete('/products/:id', deleteProduct);

// export router

export default productsRouter;