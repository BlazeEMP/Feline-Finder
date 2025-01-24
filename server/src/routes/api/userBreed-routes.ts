// TODO implement getAllUserBreeds for all users
import express from 'express';

import {
    getUserBreedsById,
    createUserBreed,
    deleteUserBreed,
} from '../../controllers/userBreed-controller.js';

const router = express.Router();

// GET /userBreeds/:userId - Get all breeds for a user by user id (should be pulled from login with JWT token???)
router.get('/:userId', getUserBreedsById);

// POST /userBreeds - Create a new user breed association (req.body should have userId and breedId)
router.post('/', createUserBreed);

// DELETE /userBreeds/:userId/:breedId - Delete a user breed association (req.body should have userId and breedId)
router.delete('/:userId&:breedId', deleteUserBreed);

export { router as userBreedRouter };