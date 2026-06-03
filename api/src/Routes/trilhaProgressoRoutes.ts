import { Router } from "express";
import { trilhaProgressoController } from "../controller/trilhaProgressoController";

const router = Router();

// =========================================
// FLUXO: responder questão e avançar trilha
// =========================================
router.post("/responder", (req, res) =>
  trilhaProgressoController.responder(req, res)
);

export default router;