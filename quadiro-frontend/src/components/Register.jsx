import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/register', { username, password, isAdmin });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      if (user.isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate('/car-list');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className='h-[100vh] flex flex-col justify-center items-center'>
      <h1 className='text-xl font-semibold mb-4'>Assignment for Quadiro Technologies</h1>
      <form onSubmit={handleSubmit}>
        <input
        className='border-2 p-2 m-2 rounded'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='border-2 p-2 m-2 rounded'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            className='border-2 p-2 m-2 rounded'
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin
        </label>
        <button type="submit" className='rounded-lg p-2 m-2 bg-teal-300 font-semibold text-zinc-100'>Register</button>
      </form>
    </div>
  );
}

export default Register;
