import { Router } from "express";
import { prisma } from "../prisma/prisma";

import { ConquistaRepository } from "../repositories/conquistaRepository";
import { ConquistaService } from "../services/conquistaService";
import { ConquistaController } from "../controller/conquistaController";

const router = Router();



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