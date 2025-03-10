

# 📦 ecommerce-api  
A step-by-step guide to creating an API with **Express.js**, **MongoDB**, and **Joi** for validation.  

## 🚀 Getting Started  

### Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/)  

---

## 🛠️ Steps to Create the API  

### **Step 1: Initialize a Node.js Project**  
Run the following command to create a `package.json` file:  
```sh
npm init -y
```

### **Step 2: Install Express.js**  
Install **Express.js**, which will be used to set up the server:  
```sh
npm i express
```

### **Step 3: Create the Express Server**  
In your `index.js` file, import `express` and set up the server:  
```js
import express from "express";

const app = express();

// Global Middleware to parse JSON
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
```

### **Step 4: Install and Configure MongoDB with Mongoose**  
Mongoose is used to interact with MongoDB. Install it using:  
```sh
npm i mongoose
```

### **Step 5: Connect to MongoDB**  
Import mongoose and connect to your database in `index.js`:  
```js
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
```

### **Step 6: Create a Model for Products**  
In the `models` folder, create `ProductModel.js` and define your schema:  
```js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model("Product", productSchema);
```

### **Step 7: Create Controllers**  
In the `controllers` folder, create `productController.js` and define business logic:  
```js
import { ProductModel } from "../models/ProductModel.js";

export const getProducts = async (req, res, next) => {
  try {
    const result = await ProductModel.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
```

### **Step 8: Set Up Routes**  
Create a `routes` folder and inside, create `productRoutes.js`:  
```js
import express from "express";
import { getProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);

export default router;
```

### **Step 9: Use Routes in the Main Server File**  
Import and use the routes in `index.js`:  
```js
import productRoutes from "./routes/productRoutes.js";

app.use("/api", productRoutes);
```

### **Step 10: Install and Configure Joi for Validation**  
Install **Joi** for request validation:  
```sh
npm i joi
```

Create a validation file `validators/productValidator.js`:  
```js
import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  quantity: Joi.number().required(),
});
```

Use the validation middleware in the routes:  
```js
import { productSchema } from "../validators/productValidator.js";

router.post("/products", async (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});
```

---

## 🎯 Running the API  
Start your server with:  
```sh
node index.js
```
or if using **nodemon**:  
```sh
npx nodemon index.js
```

---

## 🛠️ API Endpoints  

| Method | Endpoint        | Description            |
|--------|---------------|------------------------|
| GET    | `/api/products` | Get all products      |
| POST   | `/api/products` | Create a new product  |

---

## 🔥 Conclusion  
You have now created an API using **Express.js, MongoDB, and Joi** for validation! 🎉  

Would you like any modifications or additional features? 🚀