import { Router } from "express";
import {prisma } from "../prisma/prisma";

import { ModuloRepository } from "../repositories/moduloRepository";
import { ModuloService } from "../services/moduloService";
import { ModuloController } from "../controller/moduloController";

const router = Router();


const repository = new ModuloRepository(prisma);
const service = new ModuloService(repository);
const controller = new ModuloController(service);

router.get(
  "/",
  controller.listar.bind(controller)
);

router.get(
  "/trilha/:trilhaId",
  controller.listarPorTrilha.bind(controller)
);

router.get(
  "/trilha/:trilhaId/ordem/:ordem",
  controller.buscarPorTrilhaEOrdem.bind(controller)
);

router.get(
  "/:id",
  controller.obter.bind(controller)
);

export default router;