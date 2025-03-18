import { Router } from "express";
import { addProducts, countProducts, deleteProduct, getProducts, updateProduct } from "../controllers/products.js";
import { localUpload, productImageUpload, productPicturesUpload, remoteUpload } from "../middlewares/upload.js";

// Create product router

const productsRouter = Router();

// define routes

productsRouter.post ('/products',
  // productImageUpload.single('image'),
  productPicturesUpload.array("pictures",3),
 addProducts);

productsRouter.get ('/products', getProducts);

productsRouter.get ('/products/count', countProducts );

productsRouter.patch ('/products/:id', updateProduct);

productsRouter.delete('/products/:id', deleteProduct);

// export router

export default productsRouter;