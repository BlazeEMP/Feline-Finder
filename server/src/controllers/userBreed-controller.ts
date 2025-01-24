// TODO implement getAllUserBreeds for all users to view whole join table
import { Request, Response } from 'express';
import { User } from '../models/user.js';

// GET /userBreeds/:userId
export const getUserBreedsById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userBreeds = await user.getBreeds(/*{attributes: { exclude: ['password'] }}*/); // may be neede to exclude password if we use this to join the users table and the breeds table and display all the info
        return res.status(200).json(userBreeds);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// POST /userBreeds
// TODO check implement using req.body to pass in userId and breedId and use GET example above for new format of finding user, and using user Mixin methods
export const createUserBreed = async (req: Request, res: Response) => {
    const { userId, breedId } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newUserBreed = await user.addBreed(breedId);
        return res.status(201).json(newUserBreed);
        // TODO check
        // when using custom model for join table(through table)
        // const newUser = await UserBreed.create({ userId, breedId });
        // res.status(201).json(newUser);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

// TODO make sure this can get the breedId based on what button is being clicked on savedCats page
// pass in the userId and delete from the join table only the row for the userId that also matches the breedId in the second column
// DELETE /userBreeds/:userId/:breedId
export const deleteUserBreed = async (req: Request, res: Response) => {
    const { userId, breedId } = req.params;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        try {
            await user.removeBreed(breedId);
            return res.json({ message: `UserBreed association deleted for user:${userId} and breed:${breedId}` });
        } catch (error: any) {
            return res.status(404).json({ message: 'Breed not found' });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};