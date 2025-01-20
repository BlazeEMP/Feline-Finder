import { Router } from 'express';
import { breedRouter } from './breed-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/breeds', breedRouter);
router.use('/users', userRouter);

export default router;
