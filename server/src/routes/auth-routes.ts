import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
dotenv.config();

const router = Router();

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    // TODO: If the user exists and the password is correct, return a JWT token

    // IMPORTANT!!! checkvalidity of code, verify if using email and password
    // IMPORTANT!!! if changing values to login like using email instead of username, change the values in the user-seeds.ts and user models.ts etc
    try {
        // Lookup user, verify email and password
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        // Return the token
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

router.post('/login', login);

export default router;