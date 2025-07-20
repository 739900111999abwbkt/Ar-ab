const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// تسجيل مستخدم جديد
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      userID: `USR${Date.now()}`
    });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

    const token = jwt.sign({ id: user._id }, 'secret-key', { expiresIn: '7d' });
    user.isOnline = true;
    await user.save();

    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// تسجيل الخروج
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.isOnline = false;
    await user.save();
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed' });
  }
};
