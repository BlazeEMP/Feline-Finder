import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
// TODO get auth routing paths working and added where needed
// import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);// Added 'authenticateToken' to fix error line 4 jan-21-njw
export default router;