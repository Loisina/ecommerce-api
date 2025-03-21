import { Router } from "express";
import { addProducts, countProducts, deleteProduct, getProducts, updateProduct } from "../controllers/products.js";
import { localUpload, productImageUpload, productPicturesUpload, remoteUpload } from "../middlewares/upload.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

// Create product router

const productsRouter = Router();

// define routes

productsRouter.post (
  '/products',isAuthenticated,
  isAuthorized(["superadmin", "admin"]),
  productImageUpload.single('image'),
  // productPicturesUpload.array("pictures",3),
 addProducts);

productsRouter.get ('/products', getProducts);

productsRouter.get ('/products/count', countProducts );

productsRouter.patch ('/products/:id',isAuthenticated, updateProduct);

productsRouter.delete('/products/:id',isAuthenticated, deleteProduct);

productsRouter.put ('/products/:id',
  isAuthenticated,
  productImageUpload.single('image'),
   updateProduct);


// export router

export default productsRouter;