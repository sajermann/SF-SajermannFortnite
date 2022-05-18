import express from "express";
import { UserServices } from "./services/UserServices";

export const routes = express.Router();

routes.get("/getStatsByUsername", async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.sendStatus(404).send();
  }
  const userServices = new UserServices();
  const result = await userServices.getStats(username as string);
  if(!result){
    return res.sendStatus(404).send();
  }
  return res.status(200).json(result);
});
