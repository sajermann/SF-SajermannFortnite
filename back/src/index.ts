import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { routes } from './routes';
import { DevServices } from './services/DevServices';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 3333, async () => {
  const result = await DevServices.getVersion();
  console.log(`Backend restarted`, { ...result });
});
