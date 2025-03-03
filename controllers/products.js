export const addProducts = (req, res) => {
  res.send('Product added!');
}

export const getProducts = (req, res) => {
  res.send('All Products!');
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

