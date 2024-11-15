import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log(form)
    try {
      await api.post('/users/signup', form);
      alert('Signup successful! Redirecting to login...');
      navigate('/login');
    } catch (err) {
        console.log(err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Signup</h2>
      <div className="w-80">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSignup}
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
        >
          Signup
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
