import { Router } from "express";


import { TemaRepository } from "../repositories/temaRepository";
import { TemaService } from "../services/temaService";
import { TemaController } from "../controller/temaController";

const router = Router();

import { prisma } from "../prisma/prisma";

const repository = new TemaRepository(prisma);
const service = new TemaService(repository);
const controller = new TemaController(service);

router.get(
  "/",
  controller.listar.bind(controller)
);

router.get(
  "/nome/:nome",
  controller.buscarPorNome.bind(controller)
);

router.get(
   "/:id",
  controller.obter.bind(controller)
);

export default router;