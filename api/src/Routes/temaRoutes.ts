import { Router } from "express";
import { PrismaClient } from "../prisma/generated/prisma";

import { TemaRepository } from "../Repositories/temaRepository";
import { TemaService } from "../Services/temaService";
import { TemaController } from "../Controller/temaController";

const router = Router();

const prisma = new PrismaClient();

const repository = new TemaRepository(prisma);
const service = new TemaService(repository);
const controller = new TemaController(service);

router.get(
  "/",
  controller.listar.bind(controller)
);

router.get(
  "/:id",
  controller.obter.bind(controller)
);

router.get(
  "/nome/:nome",
  controller.buscarPorNome.bind(controller)
);

export default router;