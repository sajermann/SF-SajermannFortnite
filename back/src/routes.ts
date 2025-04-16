import express from 'express';
import { DevServices } from './services/DevServices';
import { UserServices } from './services/UserServices';
const userServices = new UserServices();
export const routes = express.Router();

routes.get('/getStatsByUsername', async (req, res) => {
  const { username } = req.query;
  if (!username) {
    res.status(404).send({ message: 'Username field required' });
    return;
  }

  const result = await userServices.getStats(username as string);
  if (!result) {
    res.status(404).send({ message: 'User not found' });
    return;
  }
  res.status(200).json(result);
});

routes.get('/health', async (_, res) => {
  const result = await DevServices.getVersion();
  res.status(200).json(result);
});
