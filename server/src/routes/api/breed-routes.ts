import express from 'express';

import {
    getAllBreeds,
    getBreedById,
    createBreed,
    // updateBreed,
    deleteBreed,
} from '../../controllers/breed-controller.js';

const router = express.Router();

// GET /breeds - Get all breeds
router.get('/', getAllBreeds);

// GET /breeds/:id - Get a breed by id
router.get('/:id', getBreedById);

// POST /breeds - Create a new breed
router.post('/', createBreed);

// readonly data stored, no modification put request needed?
// // PUT /breeds/:id - Update a ticket by id
// router.put('/:id', updateTicket);

// DELETE /breeds/:id - Delete a breed by id
router.delete('/:id', deleteBreed);

export { router as breedRouter };