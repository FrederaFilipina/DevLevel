import { Router } from "express";
import { PrismaClient } from "../prisma/generated/prisma";

import { QuestaoRepository } from "../Repositories/questaoRepository";
import { QuestaoService } from "../Services/questaoService";
import { QuestaoController } from "../Controller/questaoController";

const router = Router();

const prisma = new PrismaClient();

const repository = new QuestaoRepository(prisma);
const service = new QuestaoService(repository);
const controller = new QuestaoController(service);

router.get(
  "/",
  controller.listar.bind(controller)
);

router.get(
  "/modulo/:moduloId",
  controller.listarPorModulo.bind(controller)
);

router.get(
  "/modulo/:moduloId/ordem/:ordem",
  controller.buscarPorModuloEOrdem.bind(controller)
);

router.get(
  "/dificuldade/:dificuldade",
  controller.listarPorDificuldade.bind(controller)
);

router.get(
  "/:id",
  controller.obter.bind(controller)
);

export default router;