import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';

// make database 
await mongoose.connect(process.env.MONGO_URI);

 
// create an express app
const app = express();
// Use global middle wares
app.use (express.json())

// use routes
app.use(productsRouter);
app.use (userRouter);


// Listen for incoming request
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`Server listening on port ${port}`)
})