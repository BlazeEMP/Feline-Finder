//impliments JWT authentication middleware
import { Request, Response, NextFunction } from 'express';  //modified file jan 21 nancy watreas
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
// TODO: verify the token exists and add the user data to the request object Completed jan 20 nancy watreas
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

