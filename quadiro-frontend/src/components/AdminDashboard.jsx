import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarForm from './CarForm';
import CarList from './CarList';
import api from '../services/api';

function AdminDashboard({ cars, fetchCars }) {

  return (
    <div className='h-[100vh] flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-semibold mb-4'>Admin Dashboard</h1>
      <CarForm cars={cars} fetchCars={fetchCars} />
      <CarList cars={cars} fetchCars={fetchCars} isAdmin={true} />
    </div>
  );
}

export default AdminDashboard;
