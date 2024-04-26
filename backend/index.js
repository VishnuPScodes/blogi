import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDb } from './src/configs/db.js';
import authRouter from './src/routes/auth.routes.js';
import blogRouter from './src/routes/blog.routes.js';

const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
app.use(cors());

app.use('/auth', authRouter);
app.use('/blog', blogRouter);
app.listen(PORT, async () => {
  try {
    await connectToDb(MONGO_URL);
    console.log('listening to the port ', PORT);
  } catch (error) {
    console.log('failed to connect to the database', error);
  }
});
