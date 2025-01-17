import express from 'express';
import {
  getAllBreeds,
  getBreedById,
  createBreed,
  // updateBreed,
  deleteBreed,
} from '../../controllers/breed-controller.js';

const router = express.Router();

// GET /tickets - Get all tickets
router.get('/', getAllBreeds);

// GET /tickets/:id - Get a ticket by id
router.get('/:id', getBreedById);

// POST /tickets - Create a new ticket
router.post('/', createBreed);

// readonly data stored, no modification put request needed?
// // PUT /tickets/:id - Update a ticket by id
// router.put('/:id', updateTicket);

// DELETE /tickets/:id - Delete a ticket by id
router.delete('/:id', deleteBreed);

export { router as breedRouter };
