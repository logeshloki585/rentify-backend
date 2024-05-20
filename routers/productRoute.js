const express = require('express');
const { getAllProduct,addProduct,deleteProductById,getProductById,updateProductById,getAllProductExclude ,getAllProductByUser} = require('../controllers/productControllers');


const route = express.Router();

route.get('/getProductById/:id',getProductById);
route.get('/getAllProductByUser/:id',getAllProductByUser);
route.get('/getAllProductExclude/:id',getAllProductExclude);
route.get('/getAllProduct',getAllProduct);
route.post('/addProduct',addProduct);
route.put('/updateProduct/:id',updateProductById);
route.delete('/deleteProduct/:id',deleteProductById);

module.exports = route;