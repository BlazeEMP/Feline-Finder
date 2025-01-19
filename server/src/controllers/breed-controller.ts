import { Request, Response } from 'express';
import { Breed } from '../models/breed.js';
import { User } from '../models/user.js';

// TODO update the code to use the correct model and associations with correct information being posted

// GET /breeds
export const getAllBreeds = async (_req: Request, res: Response) => {
  try {
    const breeds = await Breed.findAll({
      include: [
        {
          model: User,
          as: 'assignedUser', // This should match the alias defined in the association
          attributes: ['username'], // Include only the username attribute
        },
      ],
    });
    res.json(breeds);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /breeds/:id
export const getBreedById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const breed = await Breed.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignedUser', // This should match the alias defined in the association
          attributes: ['username'], // Include only the username attribute
        },
      ],
    });
    if (breed) {
      res.json(breed);
    } else {
      res.status(404).json({ message: 'Breed not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /breeds
export const createBreed = async (req: Request, res: Response) => {
  const { name, status, description, assignedUserId } = req.body;
  try {
    const newBreed = await Breed.create({ name, status, description, assignedUserId });
    res.status(201).json(newBreed);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /breeds/:id
export const updateBreed = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status, description, assignedUserId } = req.body;
  try {
    const breed = await Breed.findByPk(id);
    if (breed) {
      breed.name = name;
      breed.status = status;
      breed.description = description;
      breed.assignedUserId = assignedUserId;
      await breed.save();
      res.json(breed);
    } else {
      res.status(404).json({ message: 'Breed not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /breeds/:id
export const deleteBreed = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const breed = await Breed.findByPk(id);
    if (breed) {
      await breed.destroy();
      res.json({ message: 'Breed deleted' });
    } else {
      res.status(404).json({ message: 'Breed not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
