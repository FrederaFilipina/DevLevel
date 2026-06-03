import { Router } from "express";
import { conquistaController } from "../controller/conquistaController";

const router = Router();

/**
 * Listar todas as conquistas
 * GET /conquistas
 */
router.get("/", (req, res) => {
  return conquistaController.listarTodas(req, res);
});

/**
 * Buscar conquista por ID
 * GET /conquistas/:id
 */
router.get("/:id", (req, res) => {
  return conquistaController.buscarPorId(req, res);
});

/**
 * Buscar conquista por título
 * GET /conquistas/titulo/:titulo
 */
router.get("/titulo/:titulo", (req, res) => {
  return conquistaController.buscarPorTitulo(req, res);
});

/**
 * Listar conquistas ordenadas por XP
 * GET /conquistas/ordenadas/xp
 */
router.get("/ordenadas/xp", (req, res) => {
  return conquistaController.listarOrdenadasPorXp(req, res);
});

export default router;