import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

const EditCar = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', description: '', tags: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        const car = response.data;
        setForm({
          title: car.title,
          description: car.description,
          tags: car.tags.join(', '),
        });
      } catch (err) {
        console.error('Failed to fetch car details:', err);
      }
    };
    fetchCar();
  }, [id]);

  const handleEditCar = async () => {
    try {
      const formattedTags = form.tags.split(',').map((tag) => tag.trim());
      await api.patch(`/cars/${id}`, { ...form, tags: formattedTags });
      alert('Car updated successfully!');
      navigate(`/cars/${id}`);
    } catch (err) {
      setError('Failed to update car. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Car</h2>
      <div className="w-96 bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="4"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Tags</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="Enter tags (comma-separated)"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          onClick={handleEditCar}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Update Car
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default EditCar;
