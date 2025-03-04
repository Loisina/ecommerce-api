import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';

// make database 
await mongoose.connect(process.env.MONGO_URI);

 
// create an express app
const app = express();
// Use global middle wares
app.use (express.json())

// use routes
app.use(productsRouter);



// Listen for incoming request

app.listen(3000, ()=>{
  console.log('Server listening on port 3000')
})