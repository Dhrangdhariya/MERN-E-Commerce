const Product = require('../model/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.addProducts = async (req, res) => {
    try {
        const { title, desc, price, image } = req.body;
        let product = await Product.create({
            title,
            desc,
            price,
            image
        });
        res.status(200).json({ message: 'Product Added' });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        product.title = req.body.title || product.title;
        product.desc = req.body.desc || product.desc;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;

        await product.save();
        res.status(200).json({ message: 'Product Updated' });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        await product.deleteOne();
        res.status(200).json({ message: 'Product Deleted' });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}