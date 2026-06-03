import { Router } from "express";
import { questaoRespostaController } from "../controller/questaoRespostaController";

const router = Router();

/**
 * Listar todas as respostas
 * GET /questao-respostas
 */
router.get("/", (req, res) => {
  return questaoRespostaController.listarTodas(req, res);
});

/**
 * Buscar resposta por ID
 * GET /questao-respostas/:id
 */
router.get("/:id", (req, res) => {
  return questaoRespostaController.buscarPorId(req, res);
});

/**
 * Listar respostas por questão
 * GET /questao-respostas/questao/:questaoId
 */
router.get("/questao/:questaoId", (req, res) => {
  return questaoRespostaController.listarPorQuestao(req, res);
});

/**
 * Buscar respostas corretas por questão
 * GET /questao-respostas/questao/:questaoId/corretas
 */
router.get("/questao/:questaoId/corretas", (req, res) => {
  return questaoRespostaController.buscarCorretasPorQuestao(req, res);
});

export default router;