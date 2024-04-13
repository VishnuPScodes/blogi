import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { BadRequestError } from '../../../utils/response/error.js';

dotenv.config();
const secret = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
  if (!secret) {
    throw new BadRequestError('JWT secret is not provided');
  }
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const isAuthenticated = async (req, res, next) => {
  try {
    // Check if authorization header is set
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestError('Authorization token is missing');
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];

    // Verify token
    const decodedToken = await verifyToken(token);
    console.log('decoded token', decodedToken);
    // Attach user to request object
    req.user = decodedToken.user;

    next(); // Proceed to the next middleware
  } catch (error) {
    // Handle errors
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
    } else if (error instanceof BadRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Error in isAuthenticated middleware:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
