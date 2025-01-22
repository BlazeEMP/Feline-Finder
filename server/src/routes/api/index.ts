import { Router } from 'express';
import { breedRouter } from './breed-routes.js';
import { userRouter } from './user-routes.js';
import { userBreedRouter } from './userBreed-routes.js';

const router = Router();

router.use('/breeds', breedRouter);
router.use('/users', userRouter);
router.use('/user_breeds', userBreedRouter);

export default router;
