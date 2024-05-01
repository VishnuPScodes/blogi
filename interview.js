import express from 'express';

const router = express.Router();

router.get('/user/:id', getAllUsersById);

const getAllUsersById = async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  if (id < 0) {
    throw new Error('Wrong credentials');
  }

  return res.status(200).send({ mesaage: 'The id is a positive integer' });
};
