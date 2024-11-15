import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        console.error('Failed to fetch car details:', err);
      }
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await api.delete(`/cars/${id}`);
        alert('Car deleted successfully!');
        navigate('/cars');
      } catch (err) {
        console.error('Failed to delete car:', err);
      }
    }
  };

  if (!car) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
      <div className="w-3/4 bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{car.title}</h1>
        <p className="text-gray-700 mb-4">{car.description}</p>
        <p className="text-gray-600 mb-4">Tags: {car.tags.join(', ')}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/cars/${car._id}/edit`)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;