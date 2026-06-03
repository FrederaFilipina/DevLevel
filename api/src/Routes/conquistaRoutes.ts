import { Router } from "express";
import { prisma } from "../prisma/prisma";

import { ConquistaRepository } from "../Repositories/conquistaRepository";
import { ConquistaService } from "../Services/conquistaService";
import { ConquistaController } from "../Controller/conquistaController";

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