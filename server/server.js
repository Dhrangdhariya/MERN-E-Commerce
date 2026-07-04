const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoutes = require("./routes/cart");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', authRoute);
app.use('/', productRoute);
app.use("/cart", cartRoutes);
app.get('/', (req, res) => {
    res.send("server is working");
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Test2')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

    const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});