const mongoose = require('mongoose');

const product = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String },
    image: { type: String },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', product);