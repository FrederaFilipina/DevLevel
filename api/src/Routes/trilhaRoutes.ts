import { Router } from "express";
import { trilhaController } from "../controller/trilhaController";

const router = Router();

/**
 * Listar todas as trilhas
 * GET /trilhas
 */
router.get("/", (req, res) => {
  return trilhaController.listarTodas(req, res);
});

/**
 * Buscar trilha por ID
 * GET /trilhas/:id
 */
router.get("/:id", (req, res) => {
  return trilhaController.buscarPorId(req, res);
});

/**
 * Buscar trilhas por tema
 * GET /trilhas/tema/:temaId
 */
router.get("/tema/:temaId", (req, res) => {
  return trilhaController.listarPorTema(req, res);
});

/**
 * Buscar trilha por tema e ordem
 * GET /trilhas/tema/:temaId/ordem/:ordem
 */
router.get("/tema/:temaId/ordem/:ordem", (req, res) => {
  return trilhaController.buscarPorTemaEOrdem(req, res);
});

/**
 * Buscar trilha com dependências
 * GET /trilhas/:id/dependencias
 */
router.get("/:id/dependencias", (req, res) => {
  return trilhaController.buscarComDependencias(req, res);
});

/**
 * Listar trilhas com regras por tema
 * GET /trilhas/tema/:temaId/regras
 */
router.get("/tema/:temaId/regras", (req, res) => {
  return trilhaController.listarComRegrasPorTema(req, res);
});

/**
 * Validar acesso à trilha
 * GET /trilhas/:id/acesso
 */
router.get("/:id/acesso", (req, res) => {
  return trilhaController.validarAcessoTrilha(req, res);
});

export default router;