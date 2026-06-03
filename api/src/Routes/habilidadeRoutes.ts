import { Router } from "express";
import { habilidadeController } from "../controller/habilidadeController";

const router = Router();

/**
 * Listar todas as habilidades
 * GET /habilidades
 */
router.get("/", (req, res) => {
  return habilidadeController.listarTodas(req, res);
});

/**
 * Buscar habilidade por ID
 * GET /habilidades/:id
 */
router.get("/:id", (req, res) => {
  return habilidadeController.buscarPorId(req, res);
});

/**
 * Buscar habilidade por nome
 * GET /habilidades/nome/:nome
 */
router.get("/nome/:nome", (req, res) => {
  return habilidadeController.buscarPorNome(req, res);
});

export default router;