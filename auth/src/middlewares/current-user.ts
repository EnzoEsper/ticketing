import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// augmenting the type definition of the existing one to allow assign the payload property to the req.currentUser property
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// middleware to append the payload in the currentUser property if the user is logged in
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}
  
  return next();
};