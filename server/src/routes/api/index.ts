import { Router } from 'express';
import { ticketRouter } from './breeds-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/breeds', ticketRouter);
router.use('/users', userRouter);

export default router;
