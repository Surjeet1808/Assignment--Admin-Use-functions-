import React, { useEffect,useState } from 'react';
import axios from 'axios';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function CarList({ cars, fetchCars, isAdmin }) {

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/cars/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchCars();
    } catch (error) {
      console.error('Error deleting car', error);
    }
  };
  return (
    <div className='h-[100vh] flex flex-col justify-center items-center'>
      <h2 className="text-xl font-semibold mb-4 text-center">Total Cars: {cars.length}</h2>
      <h2 className="text-xl font-semibold mb-4 text-center">Car List</h2>
      <ul >
        {cars.map((car) => (
          <li key={car._id} className='flex justify-center items-center'>
            <p className='rounded-lg py-1 w-[20rem] m-2 bg-green-700 font-semibold text-zinc-100 flex'><p className='p-2'>{car.name}</p><p className='p-2'>${car.price}</p><p className='p-2'>Launched In: {car.manufacturingYear}</p></p>
            {
              isAdmin && (<>
                <button onClick={() => navigate(`/update-car/${car._id}`)} className='rounded-lg px-4 py-2 m-2 bg-red-500 font-semibold text-zinc-100'>Edit</button>
                <button onClick={() => handleDelete(car._id)}className='rounded-lg p-2 m-2 bg-zinc-700 font-semibold text-zinc-100'>Delete</button>
                </>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
