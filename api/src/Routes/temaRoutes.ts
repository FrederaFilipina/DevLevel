import { Router } from "express";


import { TemaRepository } from "../Repositories/temaRepository";
import { TemaService } from "../Services/temaService";
import { TemaController } from "../Controller/temaController";

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