import { Router } from "express";
import { PrismaClient } from "../prisma/generated/prisma";

import { TrilhaRepository } from "../Repositories/trilhaRepository";
import { TrilhaService } from "../Services/trilhaService";
import { TrilhaController } from "../Controller/trilhaController";

const router = Router();

const prisma = new PrismaClient();

const repository = new TrilhaRepository(prisma);
const service = new TrilhaService(repository);
const controller = new TrilhaController(service);

router.get(
  "/",
  controller.listar.bind(controller)
);

router.get(
  "/:id",
  controller.obter.bind(controller)
);

router.get(
  "/tema/:temaId",
  controller.listarPorTema.bind(controller)
);

router.get(
  "/tema/:temaId/ordem/:ordem",
  controller.buscarPorTemaEOrdem.bind(controller)
);

router.get(
  "/:id/anterior",
  controller.buscarTrilhaAnterior.bind(controller)
);

router.get(
  "/:id/proximas",
  controller.buscarProximasTrilhas.bind(controller)
);

export default router;