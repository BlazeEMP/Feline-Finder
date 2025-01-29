import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
// TODO get auth routing paths working and added where needed

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);
export default router;