import { Router } from "express";
import { usuarioHabilidadeController } from "../controller/usuarioHabilidadeController";

const router = Router();

/**
 * Listar todos os registros
 * GET /usuario-habilidades
 */
router.get("/", (req, res) => {
  return usuarioHabilidadeController.listarTodos(req, res);
});

/**
 * Buscar por ID
 * GET /usuario-habilidades/:id
 */
router.get("/:id", (req, res) => {
  return usuarioHabilidadeController.buscarPorId(req, res);
});

/**
 * Buscar por usuário + habilidade
 * GET /usuario-habilidades/usuario/:usuarioId/habilidade/:habilidadeId
 */
router.get(
  "/usuario/:usuarioId/habilidade/:habilidadeId",
  (req, res) => {
    return usuarioHabilidadeController.buscarPorUsuarioEHabilidade(req, res);
  }
);

/**
 * Atualizar progresso
 * PUT /usuario-habilidades/usuario/:usuarioId/habilidade/:habilidadeId
 */
router.put(
  "/usuario/:usuarioId/habilidade/:habilidadeId",
  (req, res) => {
    return usuarioHabilidadeController.atualizarProgresso(req, res);
  }
);

/**
 * Incrementar pontuação
 * POST /usuario-habilidades/incrementar
 */
router.post("/incrementar", (req, res) => {
  return usuarioHabilidadeController.incrementarPontuacao(req, res);
});

/**
 * Subir nível da habilidade
 * POST /usuario-habilidades/subir-nivel
 */
router.post("/subir-nivel", (req, res) => {
  return usuarioHabilidadeController.subirNivel(req, res);
});

/**
 * Resetar progresso
 * DELETE /usuario-habilidades/usuario/:usuarioId/habilidade/:habilidadeId
 */
router.delete(
  "/usuario/:usuarioId/habilidade/:habilidadeId",
  (req, res) => {
    return usuarioHabilidadeController.resetarProgresso(req, res);
  }
);

export default router;