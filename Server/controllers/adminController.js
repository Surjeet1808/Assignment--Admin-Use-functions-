const Car = require('../models/car');

exports.createCar = async (req, res) => {
  const car = new Car(req.body);
  try {
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    console.log(cars);
    res.json(cars);
  } catch (error) {
    res.status(500).send();
  }
};

exports.getOneCar = async (req, res) => {
  try {
    const id=req.params.id;
    const car = await Car.findById(id);
    res.json(car);
  } catch (error) {
    res.status(500).send();
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) {
      return res.status(404).send();
    }
    res.send(car);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).send();
    }
    res.send(car);
  } catch (error) {
    res.status(500).send();
  }
};
