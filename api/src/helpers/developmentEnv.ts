import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

//DB
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const PORT = process.env.PORT
export const NODE_ENV = process.env.NODE_ENV
//Cloudinary

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

//jwt
export const JWT_SECRET = process.env.JWT_SECRET

//nodemailer
export const EMAIL_HOST = process.env.EMAIL_HOST
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME