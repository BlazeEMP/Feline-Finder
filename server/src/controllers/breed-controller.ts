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

// GET /breeds/:breedName
export const getBreedByName = async (req: Request, res: Response) => {
  const { breedName } = req.params;
  try {
    const breed = await Breed.findByPk(breedName);
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
  const { breedName, imgUrl, weight, lifespan, origin, hairless, description, dogFriendly, childFriendly } = req.body;
  try {
    const newBreed = await Breed.create({ breedName, imgUrl, weight, lifespan, origin, hairless, description, dogFriendly, childFriendly });
    res.status(201).json(newBreed);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// No updating of breeds set up for static info right now, could possibly add a case to check if info stored in db is the same if it ever runs across the same breed again
// // PUT /breeds/:id
// export const updateBreed = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { name, status, description, assignedUserId } = req.body;
//   try {
//     const breed = await Breed.findByPk(id);
//     if (breed) {
//       breed.name = name;
//       breed.status = status;
//       breed.description = description;
//       breed.assignedUserId = assignedUserId;
//       await breed.save();
//       res.json(breed);
//     } else {
//       res.status(404).json({ message: 'Breed not found' });
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

// DELETE /breeds/:id
// BE VERY CAREFUL, there will be a join table referencing the breed saved by any user, if you delete a breed that is saved by a user, it will break the join table information
export const deleteBreed = async (req: Request, res: Response) => {
  const { breedName } = req.params;
  try {
    const breed = await Breed.findByPk(breedName);
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
