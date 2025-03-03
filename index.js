import express from 'express';
import productsRouter from './routes/products.js';
 
// create an express app
const app = express();

// use routes
app.use(productsRouter);

// Listen for incoming request

app.listen(3000, ()=>{
  console.log('Server listening on port 3000')
})