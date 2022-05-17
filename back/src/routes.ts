import express from "express";
import { UserServices } from "./services/UserServices";

export const routes = express.Router();

routes.get("/getStatsByUsername", async (req, res) => {
  const userServices = new UserServices();
  const result = userServices.getStats("Alemão-2021");

  return res.status(200).json({data: result});
});
