import { Request, Response } from 'express';
import { Breed } from '../models/breed.js';

// GET /breeds
export const getAllBreeds = async (_req: Request, res: Response) => {
    try {
        const breeds = await Breed.findAll();
        res.json(breeds);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// GET /breeds/:id
export const getBreedById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const breed = await Breed.findByPk(id);
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
    const { id, name, imgUrl, weight, lifeSpan, origin, hairless, description, dogFriendly, childFriendly } = req.body;
    try {
        const newBreed = await Breed.create({ id, name, imgUrl, weight, lifeSpan, origin, hairless, description, dogFriendly, childFriendly });
        res.status(201).json(newBreed);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /breeds/:id
// BE VERY CAREFUL, there will be a join table referencing the breed saved by any user, if you delete a breed that is saved by a user, it will break the join table information
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
