import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const AddCar = () => {
  const [form, setForm] = useState({ title: '', description: '', tags: '', images: [] });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddCar = async () => {
    try {
      // Convert tags to an array
      const formattedTags = form.tags.split(',').map((tag) => tag.trim());
      const data = { ...form, tags: formattedTags };

      await api.post('/cars', data);
      alert('Car added successfully!');
      navigate('/cars');
    } catch (err) {
      setError('Failed to add car. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add a New Car</h2>
      <div className="w-96 bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter car title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Enter car description"
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
          <small className="text-gray-500">Example: Sedan, Toyota, 2023</small>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Images</label>
          <input
            type="file"
            multiple
            onChange={(e) =>
              setForm({ ...form, images: [...e.target.files].map((file) => file.name) })
            }
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          onClick={handleAddCar}
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
        >
          Add Car
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AddCar;
