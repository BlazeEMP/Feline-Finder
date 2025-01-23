// TODO create API routing for user_breeds table once it's figured out exactly how associations will be stored
// TODO implement getAllUserBreeds for all users
import express from 'express';

import {
    getUserBreedsById,
    createUserBreed,
    deleteUserBreed,
} from '../../controllers/userBreed-controller.js';

const router = express.Router();

// GET /UserBreeds/:userId - Get all breeds for a user by user id (should be pulled from login with JWT token???)
router.get('/:userId', getUserBreedsById);

// POST /UserBreeds - Create a new user breed association (req.body should have userId and breedId)
router.post('/', createUserBreed);


// TODO check if 2 params or req.body should be used
// DELETE /UserBreeds/:userId/:breedId - Delete a user breed association (req.body should have userId and breedId)
router.delete('/:userId/:breedId', deleteUserBreed);

export { router as userBreedRouter };