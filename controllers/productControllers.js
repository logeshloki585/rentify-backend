const Product =  require("../models/ProductModel");

const getAllProduct = async (req ,res, next ) =>{
    try {
        const products = await Product.find();
        
        return res.status(200).json({ products });
    } catch (err) {
        return res.status(404).json({ error: err });
    }
}

const getAllProductExclude = async (req ,res, next ) =>{
    try {
        const { id } = req.params;
        const query = { user: { $ne: id } };
        const products = await Product.find(query);
        return res.status(200).json({ products });
    } catch (err) {
        return res.status(404).json({ error: err });
    }
}

const addProduct = async (req, res, next) => {
    try {
        const product = new Product({ ...req.body });
        
        const response = await product.save();
        return res.status(201).json({ message: response });
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

const deleteProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ product });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
};

const updateProductById = async (req, res, next) => {
    const { id } = req.params;
    const {updateData} = req.body;
    
    try {
        const options = { new: true, runValidators: true };
        const updatedProduct = await Product.findByIdAndUpdate({_id:id}, updateData, options);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product: updatedProduct });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
};

const getAllProductByUser = async (req, res, next) => {
    try {
        const { id } = req.params;  
        const products = await Product.find({ user: id });
        return res.status(200).json({ products });
    } catch (err) {
        return res.status(500).json({ error: 'Fetching products failed, please try again later.' });
    }
}


exports.getAllProduct = getAllProduct;
exports.addProduct = addProduct;
exports.deleteProductById = deleteProductById;
exports.getProductById = getProductById;
exports.updateProductById = updateProductById;
exports.getAllProductExclude = getAllProductExclude;
exports.getAllProductByUser = getAllProductByUser;