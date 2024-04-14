import express from 'express';
import { UserAuthServices_ } from '../service/auth.service.js';

const router = express.Router();

export const getUserInfo = async (req, res) => {
  const userId = req.params.id;
  const user = await UserAuthServices_.getUserData(userId);

  res.send(user);
};

export const registerUser = async (req, res) => {
  const { name, email, password, profilePicture } = req.body;
  const user = await UserAuthServices_.registerUser({
    name,
    email,
    password,
    profilePicture,
  });

  res.status(200).send({
    message: 'User registered',
    data: user,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const loginResponse = await UserAuthServices_.userLogin({ password, email });

  res.send(loginResponse);
};

export default router;
