import { Router } from "express";
import { moduloController } from "../controller/moduloController";

const router = Router();

/**
 * Listar todos os módulos
 * GET /modulos
 */
router.get("/", (req, res) => {
  return moduloController.listarTodos(req, res);
});

/**
 * Buscar módulo por ID
 * GET /modulos/:id
 */
router.get("/:id", (req, res) => {
  return moduloController.buscarPorId(req, res);
});

/**
 * Listar módulos por trilha
 * GET /modulos/trilha/:trilhaId
 */
router.get("/trilha/:trilhaId", (req, res) => {
  return moduloController.listarPorTrilha(req, res);
});

/**
 * Buscar módulo por trilha e ordem
 * GET /modulos/trilha/:trilhaId/ordem/:ordem
 */
router.get("/trilha/:trilhaId/ordem/:ordem", (req, res) => {
  return moduloController.buscarPorTrilhaEOrdem(req, res);
});

export default router;