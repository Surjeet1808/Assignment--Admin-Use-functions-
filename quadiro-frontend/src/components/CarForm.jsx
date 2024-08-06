import React, { useState } from 'react';
import axios from 'axios';
import api from '../services/api'

function CarForm({ cars,fetchCars}) {
  const [name, setName] = useState('');
  const [manufacturingYear, setManufacturingYear] = useState('');
  const [price, setPrice] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        '/admin/cars',
        { name, manufacturingYear, price },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchCars();
      setName('');
      setManufacturingYear('');
      setPrice('');
    } catch (error) {
      console.error('Error creating car', error);
    }
  };

  return (
    <div className='sticky top-[10px] bg-zinc-100'>
    <form onSubmit={handleSubmit}>
      <input
        className='border-2 p-2 m-2 rounded'
        type="text"
        placeholder="Car Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className='border-2 p-2 m-2 rounded'
        type="number"
        placeholder="Manufacturing Year"
        value={manufacturingYear}
        onChange={(e) => setManufacturingYear(e.target.value)}
      />
      <input
        className='border-2 p-2 m-2 rounded'
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className='rounded-lg p-2 m-2 bg-blue-300 font-semibold text-zinc-100'>Add Car</button>
    </form>
    </div>
  );
}

export default CarForm;
