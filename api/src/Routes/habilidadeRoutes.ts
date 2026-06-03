import { Router } from "express";
import { prisma } from "../prisma/prisma";

import { HabilidadeRepository } from "../Repositories/habilidadeRepository";
import { HabilidadeService } from "../Services/habilidadeService";
import { HabilidadeController } from "../Controller/habilidadeController";

const router = Router();



const repository = new HabilidadeRepository(prisma);
const service = new HabilidadeService(repository);
const controller = new HabilidadeController(service);

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