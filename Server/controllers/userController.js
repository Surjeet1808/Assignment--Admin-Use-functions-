const User = require('../models/user');
const jwt = require('jsonwebtoken');
//const config = require('../config');
const Car = require("../models/car");

exports.register = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    console.log(token);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.send(cars);
  } catch (error) {
    res.status(500).send();
  }
};
