import { Router } from "express";
import { PrismaClient } from "../prisma/generated/prisma";

import { RespostaQuestaoRepository } from "../Repositories/questaoRespostaRepository";
import { RespostaQuestaoService } from "../Services/questaoRespostaService";
import { QuestaoRespostaController } from "../Controller/questaoRespostaController";

const router = Router();

const prisma = new PrismaClient();

const repository = new RespostaQuestaoRepository(prisma);
const service = new RespostaQuestaoService(repository);
const controller = new QuestaoRespostaController(service);

router.get(
  "/questao/:questaoId",
  controller.listarPorQuestao.bind(controller)
);

router.get(
  "/questao/:questaoId/titulo/:titulo",
  controller.buscarPorQuestaoETitulo.bind(controller)
);

router.get(
  "/questao/:questaoId/melhores",
  controller.listarMelhoresRespostas.bind(controller)
);

router.get(
  "/questao/:questaoId/performance",
  controller.listarPorPerformance.bind(controller)
);

router.get(
  "/questao/:questaoId/clean-code",
  controller.listarPorCleanCode.bind(controller)
);

router.get(
  "/:id",
  controller.obter.bind(controller)
);

export default router;