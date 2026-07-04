const User = require('../model/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
    return JWT.sign({ id, role }, process.env.JWT_KEY, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let existUser = await User.findOne({ email });
        if (existUser) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            isVerified: false
        });
        console.log(hashedPassword);

        res.status(200).json({ message: 'Register Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        console.log(req.body);

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        console.log("Entered password:", password);
        console.log("Stored password:", user?.password);
        console.log("Stored hash length:", user?.password?.length);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id, user.role)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}