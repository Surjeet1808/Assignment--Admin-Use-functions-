import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', { username, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      if (user.isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate('/car-list');
      }
    } catch (error) {
      console.error('Login failed', error);
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
        <button type="submit" className='rounded-lg p-2 m-2 bg-teal-300 font-semibold text-zinc-100'>Login</button>
      </form>
      <p className='mt-4 text-lg'>
        Don't have an account? <Link to="/register" className='text-blue-500'>Register</Link>
      </p>
    </div>
  );
}

export default Login;
