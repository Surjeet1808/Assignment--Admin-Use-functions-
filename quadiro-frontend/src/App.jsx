import React, {useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import CarList from './components/CarList';
import api from './services/api';
import UpdateCar from './components/UpdateCar';

function App() {

  const [cars, setCars] = useState([]);


  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await api.get('/user/cars',);
      //console.log('API response:', response.data);
      if (Array.isArray(response.data)) {
        setCars(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setCars([]);
      }
    } catch (error) {
      console.error('Error fetching cars', error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-dashboard" element={<AdminDashboard cars={cars} fetchCars={fetchCars} />} />
      <Route path="/car-list" element={<CarList cars={cars} fetchCars={fetchCars} />} />
      <Route path="/update-car/:id" element={<UpdateCar fetchCars={fetchCars} isAdmin={false} />} />
    </Routes>
  );
}

export default App;
