const express = require("express");
const router = express.Router();

const { addToCart, getCart, updateQuantity, removeItem, clearCart } = require("../controller/cart");

const { protect } = require("../middleware/auth");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateQuantity);
router.delete("/remove/:productId", protect, removeItem);
router.delete("/clear", protect, clearCart);

module.exports = router;