import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Car Management System</h1>
      <p className="text-lg text-gray-600 mb-8">Manage your cars easily and efficiently.</p>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
