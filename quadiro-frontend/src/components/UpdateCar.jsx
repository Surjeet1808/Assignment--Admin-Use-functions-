import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api'

const UpdateCar = ({ fetchCars }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState({
    name: '',
    manufacturingYear: '',
    price: '',
  });

  useEffect(()=>{
    if(id){
        api.get(`/admin/cars/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then((response)=>{
        setCar(response.data);
      })
       .catch((error)=>{
          console.error('Error fetching car', error);
        });
    } else {
      navigate('/admin-dashboard');
    }
  },[]);

  const handleChange = (e) => {
    setCar({
      ...car,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/admin/cars/${id}`, car, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchCars();
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error updating car', error);
    }
  };

  return (
    <div className='h-[100vh] flex flex-col justify-center items-center'>
    <h1 className='text-xl font-semibold mb-4'>Update Car Details</h1>
    <form onSubmit={handleSubmit}>
      <input
        className='border-2 p-2 m-2 rounded'
        type="text"
        name="name"
        value={car.name}
        onChange={handleChange}
        placeholder="Car Name"
      />
      <input
        className='border-2 p-2 m-2 rounded'
        type="number"
        name="manufacturingYear"
        value={car.manufacturingYear}
        onChange={handleChange}
        placeholder="Manufacturing Year"
      />
      <input
        className='border-2 p-2 m-2 rounded'
        type="number"
        name="price"
        value={car.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <button type="submit" className='rounded-lg p-2 m-2 bg-red-500 font-semibold text-zinc-100'>Update</button>
    </form>
    </div>
  );
};

export default UpdateCar;
