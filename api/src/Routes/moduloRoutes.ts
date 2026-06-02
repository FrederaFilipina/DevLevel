import { Router } from "express";
import { PrismaClient } from "../prisma/generated/prisma";

import { ModuloRepository } from "../Repositories/moduloRepository";
import { ModuloService } from "../Services/moduloService";
import { ModuloController } from "../Controller/moduloController";

const router = Router();

const prisma = new PrismaClient();

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