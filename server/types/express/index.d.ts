declare namespace Express {
  export interface Request {
    user?: {
      id?: number;       // User's database ID
      username: string;  // Username
      email?: string;    // User email
      iat?: number;      // JWT issued at timestamp
      exp?: number;      // JWT expiration timestamp
    } 
  }
}
