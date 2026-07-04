const Cart = require("../model/Cart");

// Add Product to Cart
exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity: 1
                    }
                ]
            });

            return res.status(201).json(cart);
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: 1
            });
        }

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get User Cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");

        if (!cart) {
            return res.json({
                items: []
            });
        }

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Increase / Decrease Quantity
exports.updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;

        if (item.quantity <= 0) {
            cart.items = cart.items.filter(
                item => item.product.toString() !== productId
            );
        }

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Remove Product From Cart
exports.removeItem = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Clear Cart
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({
            message: "Cart cleared successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};