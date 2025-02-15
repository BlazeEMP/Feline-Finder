import { Request, Response, NextFunction } from 'express';  //modified file jan 21 nancy watreas

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: number;
    email: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check if the authorization header is present
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        // Add user data to the request object
        req.user = decoded;
        // Move to the next middleware
        return next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};