const express = require('express');
const Car = require('../models/car');
const auth = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Car
 *   description: Car management
 */

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Add a new car
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Car added successfully
 *       400:
 *         description: Failed to add car
 */
router.post('/', auth, async (req, res) => {
  try {
    const car = new Car({ ...req.body, owner: req.user._id });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add car' });
  }
});

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars of the authenticated user
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cars
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, async (req, res) => {
  const cars = await Car.find({ owner: req.user._id });
  res.json(cars);
});

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get details of a specific car
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car details
 *       404:
 *         description: Car not found
 */
router.get('/:id', auth, async (req, res) => {
  const car = await Car.findOne({ _id: req.params.id, owner: req.user._id });
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json(car);
});

/**
 * @swagger
 * /api/cars/{id}:
 *   patch:
 *     summary: Update a car
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 */
router.patch('/:id', auth, async (req, res) => {
  const car = await Car.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true });
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json(car);
});

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     responses:
 *       204:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */
router.delete('/:id', auth, async (req, res) => {
  const car = await Car.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.status(204).send();
});

module.exports = router;
