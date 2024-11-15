import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      const response = await api.get('/cars');
      setCars(response.data);
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center py-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Cars</h2>
      <div className="w-80 mb-6">
        <input
          type="text"
          placeholder="Search cars..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <Link to="/cars/add" className="mb-4">
        <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
          Add Car
        </button>
      </Link>
      <ul className="w-80 space-y-4">
        {filteredCars.map((car) => (
          <li key={car._id} className="px-4 py-2 bg-white shadow rounded">
            <Link to={`/cars/${car._id}`} className="text-blue-500 hover:underline">
              {car.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
