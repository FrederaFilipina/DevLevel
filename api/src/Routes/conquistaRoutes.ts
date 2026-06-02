import { Router } from "express";
import { PrismaClient } from "../prisma/generated/prisma";

import { ConquistaRepository } from "../Repositories/conquistaRepository";
import { ConquistaService } from "../Services/conquistaService";
import { ConquistaController } from "../Controller/conquistaController";

const router = Router();

const prisma = new PrismaClient();

const repository = new ConquistaRepository(prisma);
const service = new ConquistaService(repository);
const controller = new ConquistaController(service);

router.get("/", controller.listar.bind(controller));

router.get(
  "/titulo/:titulo",
  controller.buscarPorTitulo.bind(controller)
);

router.get(
  "/:id",
  controller.obter.bind(controller)
);

export default router;