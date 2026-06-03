import { Router } from "express";
import { usuarioTrilhaController } from "../controller/usuarioTrilhaController";

const router = Router();

/**
 * Listar todos os registros
 * GET /usuario-trilhas
 */
router.get("/", (req, res) => {
  return usuarioTrilhaController.listarTodos(req, res);
});

/**
 * Buscar por ID
 * GET /usuario-trilhas/:id
 */
router.get("/:id", (req, res) => {
  return usuarioTrilhaController.buscarPorId(req, res);
});

/**
 * Buscar por usuário + trilha
 * GET /usuario-trilhas/usuario/:usuarioId/trilha/:trilhaId
 */
router.get(
  "/usuario/:usuarioId/trilha/:trilhaId",
  (req, res) => {
    return usuarioTrilhaController.buscarPorUsuarioETrilha(req, res);
  }
);

/**
 * Atualizar progresso da trilha
 * PUT /usuario-trilhas/usuario/:usuarioId/trilha/:trilhaId
 */
router.put(
  "/usuario/:usuarioId/trilha/:trilhaId",
  (req, res) => {
    return usuarioTrilhaController.atualizarProgresso(req, res);
  }
);

/**
 * Atualizar status da trilha
 * PATCH /usuario-trilhas/status
 */
router.patch("/status", (req, res) => {
  return usuarioTrilhaController.atualizarStatus(req, res);
});

/**
 * Atualizar progresso numérico
 * PATCH /usuario-trilhas/progresso-numerico
 */
router.patch("/progresso-numerico", (req, res) => {
  return usuarioTrilhaController.atualizarProgressoNumerico(req, res);
});

/**
 * Concluir trilha
 * POST /usuario-trilhas/concluir
 */
router.post("/concluir", (req, res) => {
  return usuarioTrilhaController.concluirTrilha(req, res);
});

export default router;