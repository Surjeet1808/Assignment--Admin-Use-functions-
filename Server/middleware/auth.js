// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
//const config = require('../config');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Token received:', token); // Log received token
    console.log("secret :", config.secret );
    const decoded = jwt.verify(token,process.env.JWT_SECRET );
    const user = await User.findOne({ _id: decoded._id});
    if (!user) {
      console.error('User not found'); // Log user not found error
      throw new Error();
    }
    console.log('User authenticated:', user._id); // Log authenticated user
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message); // Log error message
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send({ error: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { auth, isAdmin };
