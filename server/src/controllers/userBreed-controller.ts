import { Request, Response } from 'express';
import { UserBreed } from '../models/userBreed.js';

// GET /UserBreeds
export const getAllUserBreeds = async (_req: Request, res: Response) => {
    try {
        const userBreeds = await UserBreed.findAll(/*{attributes: { exclude: ['password'] }}*/); // may be neede to exclude password if we use this to join the users table and the breeds table and display all the info
        res.json(userBreeds);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// GET /UserBreeds/:userId
export const getUserBreedsById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const userBreeds = await UserBreed.findAll({ where: { userId: userId } }/*{attributes: { exclude: ['password'] }}*/); // may be neede to exclude password if we use this to join the users table and the breeds table and display all the info
        if (userBreeds) {
            res.json(userBreeds);
        } else {
            res.status(404).json({ message: 'UserBreeds not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// POST /UserBreeds
export const createUserBreed = async (req: Request, res: Response) => {
    const { userId, breedId } = req.body;
    try {
        const newUser = await UserBreed.create({ userId, breedId });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// TODO make sure this can get the breedId based on what button is being clicked on savedCats page
// pass in the userId and delete from the join table only the row for the userId that also matches the breedId in the second column
// DELETE /UserBreeds/:breedId
export const deleteUserBreed = async (req: Request, res: Response) => {
    const { userId, breedId } = req.params;
    //   try {
    //     const user = await User.findByPk(id);
    //     if (user) {
    //       await user.destroy();
    //       res.json({ message: 'User deleted' });
    //     } else {
    //       res.status(404).json({ message: 'User not found' });
    //     }
    //   } catch (error: any) {
    //     res.status(500).json({ message: error.message });
    //   }
};