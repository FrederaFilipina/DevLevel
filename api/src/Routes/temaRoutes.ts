import { Router } from "express";
import { temaController } from "../controller/temaController";

const router = Router();

/**
 * Listar todos os temas
 * GET /temas
 */
router.get("/", (req, res) => {
  return temaController.listarTodos(req, res);
});

/**
 * Buscar tema por ID
 * GET /temas/:id
 */
router.get("/:id", (req, res) => {
  return temaController.buscarPorId(req, res);
});

/**
 * Buscar tema por nome
 * GET /temas/nome/:nome
 */
router.get("/nome/:nome", (req, res) => {
  return temaController.buscarPorNome(req, res);
});

export default router;