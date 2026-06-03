import { Router } from "express";
import { questaoController } from "../controller/questaoController";

const router = Router();

/**
 * Listar todas as questões
 * GET /questoes
 */
router.get("/", (req, res) => {
  return questaoController.listarTodas(req, res);
});

/**
 * Buscar questão por ID
 * GET /questoes/:id
 */
router.get("/:id", (req, res) => {
  return questaoController.buscarPorId(req, res);
});

/**
 * Listar questões por módulo
 * GET /questoes/modulo/:moduloId
 */
router.get("/modulo/:moduloId", (req, res) => {
  return questaoController.listarPorModulo(req, res);
});

/**
 * Buscar questão por módulo e ordem
 * GET /questoes/modulo/:moduloId/ordem/:ordem
 */
router.get("/modulo/:moduloId/ordem/:ordem", (req, res) => {
  return questaoController.buscarPorModuloEOrdem(req, res);
});

export default router;