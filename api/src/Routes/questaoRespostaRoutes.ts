import { Router } from "express";

import { RespostaQuestaoRepository } from "../repositories/questaoRespostaRepository";
import { RespostaQuestaoService } from "../services/questaoRespostaService";
import { QuestaoRespostaController } from "../controller/questaoRespostaController";
import { prisma } from "../prisma/prisma";

const router = Router();



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